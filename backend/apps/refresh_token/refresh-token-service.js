const RefreshToken = require('./refresh-token-model')

const createRefreshToken = async (refreshToken) => {
  return await RefreshToken.create(refreshToken)
}

const getRefreshToken = async (id) => {
  return await RefreshToken.findById(id)
}

const deleteRefreshToken = async (id) => {
  await RefreshToken.findByIdAndDelete(id)
}

module.exports = {
  createRefreshToken,
  getRefreshToken,
  deleteRefreshToken
}
