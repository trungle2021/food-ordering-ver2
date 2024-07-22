const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const AuthService = require('./auth-service')
const RefreshTokenService = require('../refresh_token/refresh-token-service')

const register = catchAsyncHandler(async (req, res, next) => {
  const registerResult = await AuthService.register(req.body)
  if (!registerResult) {
    return res.status(400).json({
      status: 'fail',
      message: 'Register new user failed'
    })
  }
  return res.status(201).json({
    status: 'success',
    data: registerResult
  })
})

const login = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const loginResult = await AuthService.login(email, password)
  if (!loginResult) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid email or password'
    })
  }
  return res.status(200).json({
    status: 'success',
    data: loginResult
  })
})

const logout = catchAsyncHandler(async (req, res, next) => {
  const userId = req.userId
  await RefreshTokenService.deleteRefreshTokenByUserId(userId)
  res.status(200).json({
    status: 'success',
    message: 'Logout successfully'
  })
})

const renewAccessToken = catchAsyncHandler(async (req, res, next) => {
  const { userId, token } = req.body

  const refreshToken = await RefreshTokenService.findRefreshToken(userId, token)
  if (!refreshToken) {
    return res.status(401).json({
      status: 'fail',
      error: 'Refresh Token Expired',
      message: 'Token expired or not found'
    })
  }
  const newAccessToken = await AuthService.renewAccessToken(userId)

  if (!newAccessToken) {
    return res.status(500).json({
      status: 'error',
      message: 'Cannot get new access token'
    })
  }

  return res.status(200).json({
    status: 'success',
    data: {
      accessToken: newAccessToken
    }
  })
})

module.exports = {
  register,
  login,
  logout,
  renewAccessToken
}
