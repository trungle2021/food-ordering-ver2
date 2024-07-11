const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const StockService = require('./stock-service')

const createStock = catchAsyncHandler(async (req, res, next) => {
  // ! Need to validate request body

  const { dishId, quantity } = req.body
  if (dishId === undefined || quantity === undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing required fields'
    })
  }
  // Create a new stock entry
  const stock = await StockService.createStock(dishId, quantity)

  return res.status(201).json({
    status: 'success',
    data: stock
  })
})

module.exports = {
  createStock
}
