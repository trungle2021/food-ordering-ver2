const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const DishService = require('./dish-service')

const getDishes = catchAsyncHandler(async (req, res) => {
  const dishes = await DishService.getDishes()
  return res.status(200).json({
    status: 'success',
    data: dishes
  })
})

const getDish = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params
  const dish = await DishService.getDish(id)
  if (!dish) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: dish
  })
})

const getPoplularDishes = catchAsyncHandler(async (req, res, next) => {
  // const { limit } = req.params
  // const filter = {
  //   // order_id: '657d68d02e509f100c715b6e',
  //   order_id: '657d68d02e509f100c715b6e',
  //   order_status: 'completed'
  // }
  const result = await DishService.getPoplularDishes(filter)
  return res.status(200).json({
    status: 'success',
    data: result
  })
})
const createDishes = catchAsyncHandler(async (req, res, next) => {
  const listDishes = req.body
  const dishes = await DishService.createDishes(listDishes)
  return res.status(200).json({
    status: 'success',
    data: dishes
  })
})
const createDish = catchAsyncHandler(async (req, res, next) => {})
const updateDish = catchAsyncHandler(async (req, res, next) => {})
const deleteDish = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getDishes,
  getDish,
  getPoplularDishes,
  createDishes,
  createDish,
  updateDish,
  deleteDish
}
