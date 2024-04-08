const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const User = require('../user/user-model')
const AuthService = require('./auth-service')
const validateLoginRequest = require('./loginValidator')

const register = catchAsyncHandler(async (req, res, next) => {
  const userInput = req.body
  const isValidUserInput = await new User(userInput).validate()

  if (!isValidUserInput) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid input'
    })
  }
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

module.exports = {
  register,
  login
}
