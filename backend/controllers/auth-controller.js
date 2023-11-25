const AuthService = require('./../services/auth-service')
const catchAsync = require('./../utils/catch_async_handler/catch-async-handler')

const register = catchAsync(async (req, res) => {
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

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const token = await AuthService.login(email, password)
  if (token) {
    res.status(200).json({
      status: 'success',
      data: {
        token
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
