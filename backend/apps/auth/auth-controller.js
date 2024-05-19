const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const User = require('../user/user-model')
const AuthService = require('./auth-service')
const validateLoginRequest = require('./login-validator')
const RefreshTokenService = require('../refresh_token/refresh-token-service')

const register = catchAsyncHandler(async (req, res, next) => {
  const userInput = req.body
  console.log('User input' + req.body)
  const newUser = new User(userInput)
  await newUser.validate()
  const tokens = await AuthService.register(userInput)
  if (tokens) {
    return res.status(201).json({
      status: 'success',
      data: tokens
    })
  }
})

const login = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const validateLoginInputResult = validateLoginRequest({ email, password })
  if (validateLoginInputResult.isValid === false) {
    return res.status(400).json({
      status: 'fail',
      message: validateLoginInputResult
    })
  }
  const tokens = await AuthService.login(email, password)
  if (tokens) {
    res.status(200).json({
      status: 'success',
      data: tokens
    })
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid email or password'
    })
  }
})

const logout = catchAsyncHandler(async (req, res, next) => {
  const { user: userId } = req.body
  if (!userId) {
    return res.status(400).json({
      status: 'fail',
      message: 'User ID is required'
    })
  }
  await RefreshTokenService.deleteRefreshTokenByUserId(userId)
  res.status(200).json({
    status: 'success',
    message: 'Logout successfully'
  })
})

const getNewAccessToken = catchAsyncHandler(async (req, res, next) => {
  const { user: userId, token } = req.body

  const refreshToken = await RefreshTokenService.findRefreshToken(userId, token)
  if (!refreshToken) {
    return res.status(401).json({
      status: 'fail',
      error: 'Refresh Token Expired',
      message: 'Token expired or not found'
    })
  }
  const newAccessToken = await AuthService.getNewAccessToken(userId)
  if (newAccessToken) {
    return res.status(200).json({
      status: 'success',
      data: {
        accessToken: newAccessToken
      }
    })
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Cannot get new access token'
    })
  }
})

module.exports = {
  register,
  login,
  logout,
  getNewAccessToken
}
