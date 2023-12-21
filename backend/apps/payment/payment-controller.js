const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const PaymentService = require('./payment-service')
const PaymentInternalAccountInfo = require('./payment-internal-account-info')
const topUp = catchAsyncHandler(async (req, res, next) => {
  const { id: userId } = req.params
  const body = {
    user_id: userId,
    ...req.body
  }
  const paymentInternalAccountInfo = PaymentInternalAccountInfo.validate(body)
  if (!paymentInternalAccountInfo.result) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid payment format',
      error: paymentInternalAccountInfo
    })
  }
  await PaymentService.updateBalanceForInternalAccount(paymentInternalAccountInfo.data)
  return res.status(200).json({
    status: 'success',
    message: 'Deposit Success'
  })
})

module.exports = {
  topUp
}
