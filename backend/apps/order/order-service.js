const AppError = require('../error/app-error')
const Order = require('./order-model')
const UserService = require('../user/user-service')
const OrderDetailService = require('../order_detail/order-detail-service')
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

const createOrder = async (order) => {
  try {
    const userId = order.user

    const user = await UserService.getUser({ _id: userId })
    if (!user) {
      throw new AppError(`Cannot found User with ID: ${userId}`, 404)
    }

    const orderCreated = await Order.create(order)
    await OrderDetailService.createOrderDetails(orderCreated._id, order.orderItems)
    return orderCreated
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
  createOrder,
  updateOrder,
  deleteOrder
}
