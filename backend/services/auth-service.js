const UserService = require('./../services/user-service')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY
const accessTokenExpired = process.env.JWT_ACCESS_TOKEN_EXPIRATION
const catchAsync = require('./../utils/catch_async_handler/catch-async-handler')

const register = catchAsync(async (userData) => {
  const newUser = await UserService.create(userData)
  const payload = {
    id: newUser._id
  }
  const options = {
    expiresIn: accessTokenExpired
  }
  const accessToken = jwt.sign(payload, secretKey, options)
  return {
    access_token: accessToken,
    user: newUser._doc
  }
})

const login = catchAsync(async (email, password) => {
  const user = await UserService.findOne({ email })

  if (!user) {
    return null
  }
  const passwordIsValid = await user.comparePassword(password, user.password)
  if (!passwordIsValid) {
    return null
  }

  const payload = {
    id: user._id
  }
  const options = {
    expiresIn: accessTokenExpired
  }
  const accessToken = jwt.sign(payload, secretKey, options)
  return {
    access_token: accessToken
  }
})

module.exports = {
  register,
  login
}
