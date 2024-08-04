const CancelReason = require('./cancel-reason-model')

const createCancelReason = async (reason) => {
  return await CancelReason.create(reason)
}
const getCancelReasonById = async (id) => {
  return await CancelReason.findById(id)
}
const updateCancelReason = async (id, data) => {
  return await CancelReason.findByIdAndUpdate(id, data, { new: true })
}
const deleteCancelReason = async (id) => {
  return await CancelReason.findByIdAndDelete(id)
}

const CancelReasonService = {
  createCancelReason,
  getCancelReasonById,
  updateCancelReason,
  deleteCancelReason
}

module.exports = CancelReasonService
