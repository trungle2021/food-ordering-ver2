const AppError = require('../error/app-error')
const Dish = require('./dish-model')

const getDishes = async () => {
  return await Dish.find({}).populate({ path: 'category', select: 'name' })
}

const getDish = async (id) => {
  const dish = await Dish.findById(id)
  if (!dish) {
    return null
  }
  return dish
}

const createDishes = async (dishes) => {
  return await Dish.insertMany(dishes)
}

const createDish = async (dish) => {
  try {
    return await Dish.create(dish)
  } catch (error) {
    throw new AppError(error)
  }
}

const updateDish = async (dish) => {

}

const deleteDish = async (dish) => {

}

module.exports = {
  getDishes,
  getDish,
  createDishes,
  createDish,
  updateDish,
  deleteDish
}