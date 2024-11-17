const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler');
const BalanceService = require('./balance-service');

const getBalances = catchAsyncHandler(async (req, res) => {
  const result = await BalanceService.getBalances();
  return res.status(200).json({
    status: 'success',
    data: result,
  });
});

const getBalanceByUserId = catchAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const result = await BalanceService.getBalance({ user: userId });
  return res.status(200).json({
    status: 'success',
    data: result,
  });
});

const createBalance = catchAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  const result = await BalanceService.createBalance({ user: userId });
  return res.status(201).json({
    status: 'success',
    data: result,
  });
});

const updateBalance = catchAsyncHandler(async (req, res) => {
  const { userId: user, ...rest } = req.body;

  const modifiedPayload = {
    user,
    ...rest,
  };

  const filter = { user };
  const result = await BalanceService.updateBalance(filter, modifiedPayload);
  return res.status(200).json({
    status: 'success',
    data: result,
  });
});

const deleteAllBalances = catchAsyncHandler(async (req, res) => {
  await BalanceService.deleteAllBalances();
  return res.status(200).json({
    status: 'success',
    message: 'Delete All Balances Successfully',
  });
});

module.exports = {
  getBalanceByUserId,
  createBalance,
  updateBalance,
  getBalances,
  deleteAllBalances,
};
