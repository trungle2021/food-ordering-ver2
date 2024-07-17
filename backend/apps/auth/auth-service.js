const secretKey = process.env.JWT_SECRET_KEY
const accessTokenExpired = process.env.JWT_ACCESS_TOKEN_EXPIRATION
const refreshTokenExpired = process.env.JWT_REFRESH_TOKEN_EXPIRATION
const UserService = require('../user/user-service')
const BalanceService = require('../balance/balance-service')
const JWTService = require('../../utils/jwt/jwt-service')
const RefreshTokenService = require('../refresh_token/refresh-token-service')
const AppError = require('../../utils/error/app-error')
const RefreshToken = require('../refresh_token/refresh-token-model')

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

  await saveRefreshTokenToDB(refreshToken, _id)

  return {
    accessToken,
    refreshToken,
    user: { ...rest }
  }
}

const login = async (emailInput, passwordInput) => {
  const user = await UserService.getUser({ email: emailInput })
  console.log("USER LOGIN", user)
  if (!user) { throw new AppError(`Cannot found user with email ${emailInput}`, 404) }

  const passwordIsValid = await user.comparePassword(
    passwordInput,
    user.password
  )
  if (!passwordIsValid) throw new AppError('Password invalid', 400)

  const { password, ...rest } = user._doc
  const { _id } = rest
  const payload = { _id }
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
    payload,
    secretKey,
    tokenOptions
  )
  await saveRefreshTokenToDB(refreshToken, _id)

  return {
    accessToken,
    refreshToken,
    user: { ...rest }
  }
}

const logout = async (userId) => {
  await RefreshTokenService.deleteRefreshTokenByUserId(userId)
}

const renewAccessToken = async (userId) => {
  const user = await UserService.getUser({ _id: userId })
  if (!user) {
    throw new AppError('User not found', 400)
  }
  const payload = { _id: userId }
  return await JWTService.generateToken(
    payload,
    secretKey,
    tokenOptions.accessToken
  )
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

const saveRefreshTokenToDB = async (token, userId) => {
  // check if user exists
  const user = await UserService.getUser({ _id: userId })
  if (!user) throw new AppError('User not found', 404)

  // delete existing refresh token, if any
  await RefreshTokenService.deleteRefreshTokenByUserId(userId)

  // save new refresh token
  const refreshTokenObject = new RefreshToken({ token, user: userId })
  await RefreshTokenService.saveRefreshToken(refreshTokenObject)
}

module.exports = {
  register,
  login,
  logout,
  renewAccessToken
}
