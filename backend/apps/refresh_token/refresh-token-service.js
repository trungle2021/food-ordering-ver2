const RefreshToken = require('./refresh-token-model')

const saveRefreshToken = async (refreshTokenObject) => {
  return await RefreshToken.create(refreshTokenObject)
}

const findRefreshToken = async (user) => {
  const token = await RefreshToken.findOne({ user })
  if (token) {
    const isValidityToken = await checkValidityToken(token)
    return isValidityToken ? token : null
  }
  return null
}

const deleteRefreshTokenByUserId = async (userId) => {
  const deletedToken = await RefreshToken.findOneAndDelete({ user: userId })
  return deletedToken !== null
}

const checkValidityToken = async (token) => {
  if (token.expired_at >= new Date()) {
    console.log('Refresh token still valid')
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
  deleteRefreshTokenByUserId
}
