const { convertToObjectId } = require('../../utils/mongoose/mongoose-utils')
const RefreshToken = require('./refresh-token-model')

const saveRefreshToken = async (refreshTokenObject) => {
  return await RefreshToken.create(refreshTokenObject)
}

const getRefreshToken = async (userId) => {
  // const objectId = await convertToObjectId(userId)
  // console.log(objectId)
  return await RefreshToken.find({ user: userId })
}

const deleteRefreshToken = async (id) => {
  await RefreshToken.findByIdAndDelete(id)
}

module.exports = {
  saveRefreshToken,
  getRefreshToken,
  deleteRefreshToken
}
