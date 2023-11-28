const UserService = require('../user/user-address-service')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY
const accessTokenExpired = process.env.JWT_ACCESS_TOKEN_EXPIRATION

const register = async (userData) => {
  const newUser = await UserService.createUser(userData)
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
}

const login = async (email, password) => {
  const user = await UserService.getUser({ email })
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
  console.log(accessToken)
  return accessToken
}

module.exports = {
  register,
  login
}
