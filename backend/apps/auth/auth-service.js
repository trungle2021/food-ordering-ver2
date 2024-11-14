const secretKey = process.env.JWT_SECRET_KEY;
const accessTokenExpired = process.env.JWT_ACCESS_TOKEN_EXPIRATION;
const refreshTokenExpired = process.env.JWT_REFRESH_TOKEN_EXPIRATION;
const UserService = require('../user/user-service');
const BalanceService = require('../balance/balance-service');
const JWTService = require('../../utils/jwt/jwt-service');
const RefreshTokenService = require('../refresh_token/refresh-token-service');
const AppError = require('../../utils/error/app-error');
const User = require('../user/user-model');
const { TokenExpiredError, NotBeforeError, JsonWebTokenError } = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');

const tokenOptions = {
  accessToken: { expiresIn: accessTokenExpired },
  refreshToken: { expiresIn: refreshTokenExpired },
};

const register = async (userData) => {
  const newUser = await UserService.createUser(userData);
  await BalanceService.createBalance({ user: newUser._id, amount: 0 });
  const { password, ...rest } = newUser._doc;
  const { _id } = rest;
  const payload = { _id };

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
    payload,
    secretKey,
    tokenOptions
  );

  await RefreshTokenService.saveRefreshToken({ user: _id, token: refreshToken });

  return {
    accessToken,
    refreshToken,
    userId: _id,
  };
};

const login = async (emailInput, passwordInput) => {
  const user = await User.findOne({ email: emailInput });
  if (!user) {
    throw new AppError(`Cannot found user with email ${emailInput}`, 404);
  }

  const passwordIsValid = await user.comparePassword(passwordInput, user.password);
  if (!passwordIsValid) throw new AppError('Password invalid', 400);

  const { password, ...rest } = user._doc;
  const { _id } = rest;
  const payload = { _id };
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
    payload,
    secretKey,
    tokenOptions
  );
  await RefreshTokenService.saveRefreshToken({ user: _id, token: refreshToken });

  return {
    accessToken,
    refreshToken,
    userId: _id,
  };
};



function normalizeOAuthUserData(provider, userInfo) {
  switch (provider) {
    case 'google':
      return {
        email: userInfo.email,
        emailVerified: userInfo.email_verified,
        name: userInfo.name,
        picture: userInfo.picture,
        providerId: userInfo.sub,
      };
      
    case 'facebook':
      return {
        email: userInfo.email,
        emailVerified: true, // Facebook emails are always verified
        name: userInfo.name,
        picture: userInfo.picture?.data?.url || userInfo.picture, // Facebook returns picture in different format
        providerId: userInfo.id,
      };
      
    default:
      throw new AppError(`Unsupported OAuth provider: ${provider}`, 400);
  }
}

const logout = async (userId) => {
  await RefreshTokenService.invalidateRefreshTokenByUserId(userId);
};

const renewAccessToken = async (refreshToken) => {
  try {
    console.log('Refresh Token', refreshToken);
    const decodePayload = await JWTService.verifyToken(refreshToken, secretKey);
    const userId = decodePayload._id;

    const storedRefreshToken = await RefreshTokenService.findRefreshToken({
      user: userId,
      token: refreshToken,
    });

    if (!storedRefreshToken) {
      throw new AppError('Refresh token not found', 403);
    }

    await RefreshTokenService.invalidateRefreshTokenByUserId(userId);

    const payload = { _id: userId };
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await generateAccessTokenAndRefreshToken(payload, secretKey, tokenOptions);

    await RefreshTokenService.saveRefreshToken({ user: userId, token: newRefreshToken });

    return {
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    console.log('Error in renewAccessToken', error);
    if (error instanceof TokenExpiredError) {
      throw new AppError('Refresh token expired', 403);
    } else if (error instanceof NotBeforeError) {
      throw new AppError('Refresh token is not valid yet', 401);
    } else if (error instanceof JsonWebTokenError) {
      throw new AppError('Invalid refresh token', 401);
    }
    throw error;
  }
};

const generateAccessTokenAndRefreshToken = async (payload, secretKey, tokenOptions) => {
  const accessToken = await JWTService.generateToken(payload, secretKey, tokenOptions.accessToken);
  const refreshToken = await JWTService.generateToken(
    payload,
    secretKey,
    tokenOptions.refreshToken
  );
  return {
    accessToken,
    refreshToken,
  };
};

const getUserByOAuth = async (provider, idToken) => {
  try {
    switch (provider) {
      case 'google':
        const ticket = await googleClient.verifyIdToken({
          idToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
        
      case 'facebook':
        const fbUserInfo = await verifyFacebookToken(idToken);
        if (!fbUserInfo) {
          throw new AppError('Invalid Facebook token', 401);
        }
        return fbUserInfo;
      default:
        throw new AppError(`Unsupported OAuth provider: ${provider}`, 400);
    }
  } catch (error) {
    console.error(`Error in getUserByOAuth for provider ${provider}:`, error);
    throw new AppError(`Authentication failed with ${provider}`, 401);
  }
};

const loginOAuth = async (provider, idToken) => {
  // 1. get user info from oauth provider
  const userInfo = await getUserByOAuth(provider, idToken);
  
  if (!userInfo) {
    throw new AppError('Failed to get user info from OAuth provider', 401);
  }

  // 2. normalize user data based on provider
  const normalizedUserData = normalizeOAuthUserData(provider, userInfo);
  const { email, emailVerified, name, picture, providerId } = normalizedUserData;

  // 3. check if user exists
  let user = await User.findOne({ email });
  
  if (!user) {
    const userData = {
      name,
      email,
      is_email_verified: emailVerified,
      avatar: picture,
      isOAuth: true,
      oauthProviders: [{
        provider,
        providerId,
        profile: {
          name,
          profilePicture: picture,
        },
      }]
    };

    user = await UserService.createUser(userData);
  } else {
    const existingProvider = user.oauthProviders?.find(p => p.provider === provider);
    if (!existingProvider) {
      if (!user.oauthProviders) {
        user.oauthProviders = [];
      }

      user.oauthProviders.push({
        provider,
        providerId,
        profile: {
          name,
          profilePicture: picture,
        },
      });
      user = await user.save();
    }
  }

  const { password, _id, ...rest } = user._doc;
  const payload = { _id };
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
    payload,
    secretKey,
    tokenOptions
  );

  await RefreshTokenService.saveRefreshToken({ user: _id, token: refreshToken });

  return {
    accessToken,
    refreshToken,
    userId: _id,
  };
};

const verifyFacebookToken = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`
    );
    
    if (!response.data || !response.data.id) {
      throw new Error('Invalid Facebook response');
    }
    
    return response.data;
  } catch (error) {
    console.error('Facebook token verification failed:', error);
    return null;
  }
}

module.exports = {
  register,
  login,
  loginOAuth,
  logout,
  renewAccessToken,
};
