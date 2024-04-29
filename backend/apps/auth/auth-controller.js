const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const User = require('../user/user-model')
const AuthService = require('./auth-service')
const validateLoginRequest = require('./loginValidator')
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

const getRefreshToken = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const refreshToken = await RefreshTokenService.getRefreshToken(userId)
  return res.status(200).json({
    status: 'success',
    data: refreshToken
  })
})

module.exports = {
  register,
  login,
  getRefreshToken
}
