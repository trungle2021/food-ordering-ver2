const RefreshToken = require('./refresh-token-model')

const saveRefreshToken = async (refreshTokenObject) => {
  return await RefreshToken.create(refreshTokenObject)
}

const findRefreshToken = async (userId, refreshToken) => {
  const token = await RefreshToken.findOne({ user: userId, token: refreshToken })
  const isValidityToken = await checkValidityToken(token)
  return isValidityToken ? token : null
}

const deleteRefreshToken = async (userId) => {
  await RefreshToken.findOneAndDelete({ user: userId })
}

const checkValidityToken = async (token) => {
  if (token && token.expired_at >= new Date()) {
    return true
  }
  if (token) {
    await RefreshToken.findOneAndDelete({ user: token.user })
  }
  return false
}

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken
}
