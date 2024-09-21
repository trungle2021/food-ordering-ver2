const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler');
const PaymentService = require('./payment-service');
const paymentAction = require('../../constant/payment-action');

const topUp = catchAsyncHandler(async (req, res, next) => {
  const payload = {
    ...req.body,
    paymentAction: paymentAction.DEPOSIT,
  };
  const currentBalanceUpdated = await PaymentService.updateBalanceForInternalAccount(payload);
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'Top up successfully',
      current_balance: currentBalanceUpdated,
    },
  });
});

module.exports = {
  topUp,
};
