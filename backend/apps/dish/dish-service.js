const AppError = require('../error/app-error')
const Dish = require('./dish-model')
const OrderService = require('../order/order-service')
const ApiFeatures = require('../../utils/api-features/api-features')

const getDishes = async (queryString) => {
  const features = new ApiFeatures(Dish.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  return await features.query.populate({ path: 'category', select: 'name' })
  // return await Dish.find({}).populate({ path: 'category', select: 'name' })
}

const getDish = async (id) => {
  return await Dish.findById(id)
}

const getPoplularDishes = async (queryString) => {
  const data = await OrderService.getMostOrderedDish(limit)

  return data
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
  getPoplularDishes,
  createDish,
  updateDish,
  deleteDish
}
