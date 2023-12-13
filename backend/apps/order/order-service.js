const AppError = require('../error/app-error')
const Order = require('./order-model')
const UserService = require('../user/user-service')
const OrderDetailService = require('../order_detail/order-detail-service')
const connection = require('../../db/connection')
const { processPayment } = require('../payment/payment-service')
const { PROCESSING } = require('../../constant/order-status')

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

const deleteOrder = async (order) => {

}

const confirmOrder = async (orderConfirmInfo) => {
  const session = await connection.startSession()
  try {
    session.startTransaction()

    const {
      order_id: orderId,
      shipping_address: shippingAddress
    } = orderConfirmInfo

    const order = await Order.findById(orderId)
    if (!order) {
      throw new AppError('Order not found', 404)
    }

    const paymentStatus = null
    processPayment(orderConfirmInfo)

    order.order_status = PROCESSING
    order.shipping_address = shippingAddress
    order.payment_status = paymentStatus

    await order.save()
    session.commitTransaction()
  } catch (err) {
    session.abortTransaction()
  }
}

module.exports = {
  getOrders,
  getOrder,
  confirmOrder,
  createOrder,
  updateOrder,
  deleteOrder
}
