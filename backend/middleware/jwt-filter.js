const whitelist = require('./../utils/whitelist/whitelist-url')
const UserService = require('../apps/user/user-service')
const AppError = require('./../apps/error/app-error')
const secretKey = process.env.JWT_SECRET_KEY
const catchAsyncHandler = require('../utils/catch-async/catch-async-handler')
const JWTService = require('../utils/jwt/jwt-service')

const jwtFilterHandler = catchAsyncHandler(async (req, res, next) => {
  const currentUrl = req.url.substring(7, req.url.length)
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
  const decodePayload = await JWTService.verifyToken(token, secretKey)
  const { id } = decodePayload
  const user = await UserService.getUser({ _id: id })
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
