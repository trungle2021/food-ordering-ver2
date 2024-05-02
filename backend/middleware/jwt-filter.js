const whitelist = require('../utils/whitelist/whitelist-url')
const UserService = require('../apps/user/user-service')
const AppError = require('../apps/error/app-error')
const secretKey = process.env.JWT_SECRET_KEY
const catchAsyncHandler = require('../utils/catch-async/catch-async-handler')
const JWTService = require('../utils/jwt/jwt-service')

const jwtFilterHandler = catchAsyncHandler(async (req, res, next) => {
  const currentUrl = getCurrentUrl(req.originalUrl)
  console.log('Current URL: ' + currentUrl)
  const authHeader = req.headers.authorization

  for (const url of whitelist) {
    if (currentUrl.startsWith(url)) {
      return next()
    }
  }
  if (!authHeader) {
    throw new AppError('No authorization header', 401)
  }
  const token = extractToken(authHeader)
  const decodePayload = await JWTService.verifyToken(token, secretKey)
  const { _id } = decodePayload
  const user = await UserService.getUser({ _id })
  console.log(user)
  if (!user) {
    throw new AppError('Invalid token', 401)
  }
  next()
})

const getCurrentUrl = (originalUrl) => {
  const parts = originalUrl.split('/')
  return '/' + parts.splice(3).join('/')
}

const extractToken = (authHeader) => {
  if (authHeader.startsWith('Bearer')) {
    return authHeader.substring(7, authHeader.length)
  }
}

module.exports = jwtFilterHandler

// incoming request -> check whitelist url -> if in whitelist then can next, else stop them then extract
