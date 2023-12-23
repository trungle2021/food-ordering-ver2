const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const AuthService = require('./auth-service')

const register = catchAsyncHandler(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    balance: req.body.balance,
    avatar: req.body.avatar
  }
  const newUser = await AuthService.register(userData)
  res.status(201).json({
    status: 'success',
    data: newUser
  })
})

const login = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const token = await AuthService.login(email, password)
  if (token) {
    res.status(200).json({
      status: 'success',
      data: {
        access_token: token,
        refresh_token: null
      }
    })
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid email or password'
    })
  }
})

module.exports = {
  register,
  login
}
