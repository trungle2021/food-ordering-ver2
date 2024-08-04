const RefreshToken = require('./refresh-token-model')

const saveRefreshToken = async (refreshTokenObject) => {
  return await RefreshToken.create(refreshTokenObject)
}

const findRefreshToken = async (filter) => {
  return await RefreshToken.findOne(filter)
}

const invalidateRefreshTokenByUserId = async (userId) => {
  return await RefreshToken.findOneAndDelete({ user: userId })
}

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  invalidateRefreshTokenByUserId
}
