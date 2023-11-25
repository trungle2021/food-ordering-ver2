const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const whitelist = require('./../utils/whitelist/whitelist-url')
const UserService = require('./../services/user-service')
const AppError = require('../utils/error_handler/app-error')
const secretKey = process.env.JWT_SECRET_KEY
const catchAsync = require('./../utils/catch_async_handler/catch-async-handler')

const jwtFilterHandler = catchAsync(async (req, res, next) => {
  const currentUrl = req.url.replace('/api/v1', '')
  const authHeader = req.header('authorization')

  for (const url of whitelist) {
    if (currentUrl.startsWith(url)) {
      return next()
    }
  }
  if (!authHeader) {
    throw new AppError('Invalid credentials', 401)
  }
  const token = extractToken(authHeader)
  const decodePayload = await promisify(jwt.verify)(token, secretKey)
  const { id } = decodePayload
  const user = await UserService.findOneById(id)
  if (!user) {
    throw new AppError('Invalid credentials', 401)
  }
  next()
})

const extractToken = (authHeader) => {
  if (authHeader.startsWith('Bearer')) {
    return authHeader.substring(7, authHeader.length)
  }
}

module.exports = jwtFilterHandler

// incoming request -> check whitelist url -> if in whitelist then can next, else stop them then extract
