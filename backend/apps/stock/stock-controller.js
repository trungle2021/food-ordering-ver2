const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const StockService = require('./stock-service')

const createStock = catchAsyncHandler(async (req, res, next) => {
  const { dishId, quantity } = req.body
  const stock = await StockService.createStock({ dishId, quantity })
  return res.status(201).json({
    status: 'success',
    data: stock
  })
})

module.exports = {
  createStock
}
