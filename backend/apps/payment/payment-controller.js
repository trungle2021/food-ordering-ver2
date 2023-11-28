const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const MealService = require('./meal-service')

const getMeals = catchAsyncHandler(async (req, res) => {
  const meals = await MealService.getMeals()
  return res.status(200).json({
    status: 'success',
    data: meals
  })
})

const getMeal = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params.id
  const meal = await MealService.getMeal(id)
  if (!meal) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: meal
  })
})

const createMeals = catchAsyncHandler(async (req, res, next) => {
  const listMeals = req.body
  const meals = await MealService.createMeals(listMeals)
  return res.status(200).json({
    status: 'success',
    data: meals
  })
})
const createMeal = catchAsyncHandler(async (req, res, next) => {})
const updateMeal = catchAsyncHandler(async (req, res, next) => {})
const deleteMeal = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getMeals,
  getMeal,
  createMeals,
  createMeal,
  updateMeal,
  deleteMeal
}
