const AppError = require('../error/app-error')
const Meal = require('./meal-model')

const getMeals = async () => {
  return await Meal.find({}).populate({ path: 'category', select: 'name' })
}

const getMeal = async (id) => {
  const meal = await Meal.findById(id)
  if (!meal) {
    return null
  }
  return meal
}

const createMeals = async (meals) => {
  return await Meal.insertMany(meals)
}

const createMeal = async (meal) => {
  try {
    return await Meal.create(meal)
  } catch (error) {
    throw new AppError(error)
  }
}

const updateMeal = async (meal) => {

}

const deleteMeal = async (meal) => {

}

module.exports = {
  getMeals,
  getMeal,
  createMeals,
  createMeal,
  updateMeal,
  deleteMeal
}
