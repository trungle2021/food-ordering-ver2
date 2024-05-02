const secretKey = process.env.JWT_SECRET_KEY
const accessTokenExpired = process.env.JWT_ACCESS_TOKEN_EXPIRATION
const refreshTokenExpired = process.env.JWT_REFRESH_TOKEN_EXPIRATION
const UserService = require('../user/user-service')
const JWTService = require('../../utils/jwt/jwt-service')
const RefreshTokenService = require('../refresh_token/refresh-token-service')
const AppError = require('../error/app-error')
const RefreshToken = require('../refresh_token/refresh-token-model')

const tokenOptions = {
  accessToken: { expiresIn: accessTokenExpired },
  refreshToken: { expiresIn: refreshTokenExpired }
}

const register = async (userData) => {
  const newUser = await UserService.createUser(userData)
  const { password, balance, ...rest } = newUser._doc
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

  if (!user) { throw new AppError(`Cannot found user with email ${emailInput}`, 404) }

  const passwordIsValid = await user.comparePassword(
    passwordInput,
    user.password
  )
  if (!passwordIsValid) throw new AppError('Password invalid', 400)

  const { password, balance, ...rest } = user._doc
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
  await RefreshTokenService.deleteRefreshToken(userId)
}

const getNewAccessToken = async (userId) => {
  const user = await UserService.getUser({_id:userId})
  if(!user){
    throw new AppError("User not found", 400)
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
  const refreshTokenObject = new RefreshToken({ token, user: userId })
  await RefreshTokenService.saveRefreshToken(refreshTokenObject)
}

module.exports = {
  register,
  login,
  logout,
  getNewAccessToken
}
