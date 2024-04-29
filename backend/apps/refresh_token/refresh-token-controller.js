const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const RefreshTokenService = require('./refresh-token-service')
const RefreshToken = require('./refresh-token-model')
const { Mongoose } = require('mongoose')

const saveRefreshToken = catchAsyncHandler(async (req, res, next) => {
  const refreshToken = await new RefreshToken(req.body).validate()
  const newRefreshToken = await RefreshTokenService.saveRefreshToken(refreshToken)
  return res.status(200).json({
    status: 'success',
    data: newRefreshToken
  })
})

const getRefreshToken = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params
  console.log(userId)
  if (!Mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid user id'
    })
  }
  const refreshToken = RefreshTokenService.getRefreshToken(userId)
  return res.status(200).json({
    status: 'success',
    data: refreshToken
  })
})

const deleteRefreshToken = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params
  await RefreshTokenService.deleteRefreshToken(id)
  return res.status(200).json({
    status: 'success',
    message: 'Delete Token Successfully'
  })
})

module.exports = {
  saveRefreshToken,
  getRefreshToken,
  deleteRefreshToken
}
