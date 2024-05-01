 const RefreshToken = require('./refresh-token-model')

const saveRefreshToken = async (refreshTokenObject) => {
  return await RefreshToken.create(refreshTokenObject)
}

const findRefreshToken = async (userId, refreshToken) => {
  const token = await RefreshToken.findOne({ user: userId, token: refreshToken })
  if(token && token.expired_at >= new Date()) {
    return token
  }
  return null
}

const deleteRefreshToken = async (userId) => {
  await RefreshToken.findOneAndDelete({user: userId})
}

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken
}
