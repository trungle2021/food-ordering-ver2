const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler');
const StockService = require('./stock-service');

const upsertStock = catchAsyncHandler(async (req, res, next) => {
  const { dishId, quantity } = req.body;
  const stock = await StockService.upsertStock({ dishId, quantity });
  return res.status(201).json({
    status: 'success',
    data: stock,
  });
});

const initializeStockForAllDishes = catchAsyncHandler(async (req, res, next) => {
  const stock = await StockService.initializeStockForAllDishes();
  return res.status(201).json({
    status: 'success',
    data: stock,
  });
});

const deleteAllStock = catchAsyncHandler(async (req, res, next) => {
  const stock = await StockService.deleteAllStock();
  return res.status(201).json({
    status: 'success',
    data: stock,
  });
});

module.exports = {
  upsertStock,
  initializeStockForAllDishes,
  deleteAllStock,
};
