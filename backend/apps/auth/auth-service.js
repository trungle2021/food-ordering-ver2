const secretKey = process.env.JWT_SECRET_KEY
const accessTokenExpired = process.env.JWT_ACCESS_TOKEN_EXPIRATION
const refreshTokenExpired = process.env.JWT_REFRESH_TOKEN_EXPIRATION
const UserService = require('../user/user-service')
const BalanceService = require('../balance/balance-service')
const JWTService = require('../../utils/jwt/jwt-service')
const RefreshTokenService = require('../refresh_token/refresh-token-service')
const AppError = require('../../utils/error/app-error')
const User = require('../user/user-model')
const { TokenExpiredError, NotBeforeError, JsonWebTokenError } = require('jsonwebtoken')

const tokenOptions = {
  accessToken: { expiresIn: accessTokenExpired },
  refreshToken: { expiresIn: refreshTokenExpired }
}

const register = async (userData) => {
  const newUser = await UserService.createUser(userData)
  await BalanceService.createBalance({ user: newUser._id })
  const { password, ...rest } = newUser._doc
  const { _id } = rest
  const payload = { _id }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
    payload,
    secretKey,
    tokenOptions
  )

  await RefreshTokenService.saveRefreshToken({ user: _id, token: refreshToken })

  return {
    accessToken,
    refreshToken,
    userId: _id
  }
}

const login = async (emailInput, passwordInput) => {
  const user = await User.findOne({ email: emailInput })
  if (!user) { throw new AppError(`Cannot found user with email ${emailInput}`, 404) }


  const passwordIsValid = await user.comparePassword(
    passwordInput,
    user.password
  )
  if (!passwordIsValid) throw new AppError('Password invalid', 400)

  const { password, ...rest } = user._doc
  const { _id } = rest
  const payload = { _id }
  console.log(tokenOptions)
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
    payload,
    secretKey,
    tokenOptions
  )
  await RefreshTokenService.saveRefreshToken({ user: _id, token: refreshToken })

  return {
    accessToken,
    refreshToken,
    userId: _id
  }
}

const logout = async (userId) => {
  await RefreshTokenService.invalidateRefreshTokenByUserId (userId)
}

const renewAccessToken = async (refreshToken) => {
  try {
    console.log("Refresh Token", refreshToken)
    const decodePayload = await JWTService.verifyToken(refreshToken, secretKey)
    const userId = decodePayload._id

    const storedRefreshToken = await RefreshTokenService.findRefreshToken({ user: userId, token: refreshToken })

    if (!storedRefreshToken) {
      throw new AppError('Refresh token not found', 403)
    }

    await RefreshTokenService.invalidateRefreshTokenByUserId(userId)

    const payload = { _id: userId }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateAccessTokenAndRefreshToken(
      payload,
      secretKey,
      tokenOptions
    )

    await RefreshTokenService.saveRefreshToken({ user: userId, token: newRefreshToken })

    return {
      newAccessToken,
      newRefreshToken
    }
  } catch (error) {
    console.log("Error in renewAccessToken", error)
    if (error instanceof TokenExpiredError) {
      throw new AppError('Refresh token expired', 403)
    } else if (error instanceof NotBeforeError) {
      throw new AppError('Refresh token is not valid yet', 401)
    } else if (error instanceof JsonWebTokenError) {
      throw new AppError('Invalid refresh token', 401)
    }
    throw error
  }
}

const generateAccessTokenAndRefreshToken = async (payload, secretKey, tokenOptions) => {
  const accessToken = await JWTService.generateToken(
    payload,
    secretKey,
    tokenOptions.accessToken
  )
  const refreshToken = await JWTService.generateToken(
    payload,
    secretKey,
    tokenOptions.refreshToken
  )
  return {
    accessToken,
    refreshToken
  }
}

module.exports = {
  register,
  login,
  logout,
  renewAccessToken
}
