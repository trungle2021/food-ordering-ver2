const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const generateToken = async (payload, secretKey, options) => {
  return await promisify(jwt.sign)(payload, secretKey, options)
}

const verifyToken = async (token, secretKey) => {
  return await promisify(jwt.verify)(token, secretKey)
}

module.exports = {
  generateToken,
  verifyToken
}
