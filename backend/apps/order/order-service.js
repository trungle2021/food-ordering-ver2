const AppError = require('../error/app-error')
const Order = require('./order-model')
const UserService = require('../user/user-service')
const OrderDetailService = require('../order_detail/order-detail-service')
const connection = require('../../db/connection')

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

const createOrder = async (order, orderItems) => {
  const session = await connection.startSession()
  try {
    session.startTransaction()
    const userId = order.user
    const user = await UserService.getUser({ _id: userId })
    if (!user) {
      throw new AppError(`Cannot found User with ID: ${userId}`, 404)
    }
    const orderCreated = await Order.create([order], { session })
    await OrderDetailService.createOrderDetails(orderCreated[0]._id, orderItems, { session })
    await session.commitTransaction()
    return orderCreated
  } catch (error) {
    await session.abortTransaction()
    throw new AppError(error)
  } finally {
    await session.endSession()
  }
}

const updateOrder = async (order) => {

}

const checkOut = async () => {

}

const deleteOrder = async (order) => {

}

module.exports = {
  getOrders,
  getOrder,
  checkOut,
  createOrder,
  updateOrder,
  deleteOrder
}
