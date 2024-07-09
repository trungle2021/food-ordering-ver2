const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const BalanceService = require('./balance-service')

const getBalance = catchAsyncHandler(async (req, res) => {
  const userId = req.userId
  const result = await BalanceService.getBalance({ user: userId })
  return res.status(200).json({
    status: 'success',
    data: result
  })
})

const createBalance = catchAsyncHandler(async (req, res) => {
  const userId = req.userId
  const result = await BalanceService.createBalance({ user: userId })
  return res.status(200).json({
    status: 'success',
    data: result
  })
})

const updateBalance = catchAsyncHandler(async (req, res) => {
  const userId = req.userId
  const filter = { user: userId }
  const data = req.body
  const result = await BalanceService.updateBalance(filter, data)
  return res.status(200).json({
    status: 'success',
    data: result
  })
})

module.exports = {
  getBalance,
  createBalance,
  updateBalance
}
