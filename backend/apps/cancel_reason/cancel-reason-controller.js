const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const CancelReasonService = require('./cancel-reason-service')

const createCancelReason = catchAsyncHandler(async (res, req, next) => {
  const { reason } = req.body
  const cancelReason = await CancelReasonService.createCancelReason(reason)
  if (cancelReason) {
    return res.status(201).json({
      status: 'success',
      data: cancelReason
    })
  }
})

const getCancelReasons = catchAsyncHandler(async (res, req, next) => {
  const cancelReasons = await CancelReasonService.getCancelReasons()
  if (cancelReasons) {
    return res.status(200).json({
      status: 'success',
      data: cancelReasons
    })
  }
})

const getCancelReasonById = catchAsyncHandler(async (res, req, next) => {
  const { reasonId } = req.params
  const cancelReason = await CancelReasonService.getCancelReasonById(reasonId)
  if (cancelReason) {
    return res.status(200).json({
      status: 'success',
      data: cancelReason
    })
  }
})

module.exports = {
  createCancelReason,
  getCancelReasons,
  getCancelReasonById
}
