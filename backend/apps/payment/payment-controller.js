const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const PaymentService = require('./payment-service')
const PaymentInternalAccountInfo = require('./payment-internal-account-info')
const paymentAction = require('../../constant/payment-action')

const topUp = catchAsyncHandler(async (req, res, next) => {
  const paymentInternalAccountInfo = PaymentInternalAccountInfo.validate(req.body)

  if (!paymentInternalAccountInfo.isValid) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid payment format',
      error: paymentInternalAccountInfo
    })
  }

  const body = {
    ...req.body,
    payment_method: paymentAction.DEPOSIT
  }

  const currentBalanceUpdated = await PaymentService.updateBalanceForInternalAccount(body)
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'Top up successfully',
      current_balance: currentBalanceUpdated
    }
  })
})

module.exports = {
  topUp
}
