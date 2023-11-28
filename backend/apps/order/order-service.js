const AppError = require('../error/app-error')
const Order = require('./order-model')

const getOrders = async () => {
  return await Order.find({}).populate({ path: 'category', select: 'name' })
}

const getOrder = async (id) => {
  const order = await Order.findById(id)
  if (!order) {
    return null
  }
  return order
}

const createOrders = async (orders) => {
  return await Order.insertMany(orders)
}

const createOrder = async (order) => {
  try {
    return await Order.create(order)
  } catch (error) {
    throw new AppError(error)
  }
}

const updateOrder = async (order) => {

}

const deleteOrder = async (order) => {

}

module.exports = {
  getOrders,
  getOrder,
  createOrders,
  createOrder,
  updateOrder,
  deleteOrder
}
