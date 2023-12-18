const AppError = require('../error/app-error')
const Dish = require('./dish-model')
const OrderDetailService = require('../order_detail/order-detail-service')

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

const getPoplularDishes = async (filter) => {
  // const { order_id: orderId, order_status: orderStatus } = filter
  const { order_id: orderId } = filter
  console.log(orderId)
  // OrderDetailService.getOrderDetails({ 'order._id': orderId, 'order.order_status': orderStatus })
  const data = await OrderDetailService.getOrderDetails({ order: orderId })
  console.log(data)
  return data
  // count which dish is ordered most
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
