const AppError = require('../error/app-error')
const Order = require('./model/order-model')
const UserService = require('../user/user-service')
const OrderDetailService = require('../order_detail/order-detail-service')
const connection = require('../../db/connection')
const { processPayment, updateBalanceForInternalAccount } = require('../payment/payment-service')
const { PROCESSING, CANCELED, COMPLETED, SHIPPING } = require('../../constant/order-status')
const { PAID, REFUNDED } = require('../../constant/payment-status')
const { DEPOSIT } = require('../../constant/payment-action')

const getOrders = async (filter) => {
  const {limit}
  return await Order.find(filter).populate({ path: 'category', select: 'name' })
}

const getOrder = async (filter) => {
  const order = await Order.findOne(filter)
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
    console.log(order)
    const user = await UserService.getUser({ _id: userId })
    if (!user) {
      throw new AppError(`Cannot found User with ID: ${userId}`, 404)
    }
    const orderCreated = await Order.create([order], { session })
    await OrderDetailService.createOrderDetails(orderCreated[0]._id, orderItems, { session })
    await session.commitTransaction()
    return orderCreated
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    throw new AppError(error.message, error.statusCode)
  } finally {
    await session.endSession()
  }
}

const deleteOrder = async (filter) => {
  await Order.deleteOne(filter)
}

const deleteAll = async () => {
  await Order.deleteMany({})
  await OrderDetailService.deleteAll()
}

const confirmOrder = async (orderConfirmInfo) => {
  let orderAfterPaid
  const session = await connection.startSession()
  try {
    session.startTransaction()

    const {
      order_id: orderId,
      shipping_address: shippingAddress,
      payment_info: { payment_method: paymentMethod }
    } = orderConfirmInfo

    const order = await Order.findById(orderId)
    if (!order) {
      throw new AppError('Order not found', 404)
    }
    orderAfterPaid = await processPayment(order, orderConfirmInfo)
    orderAfterPaid.payment_method = paymentMethod
    orderAfterPaid.order_status = PROCESSING
    orderAfterPaid.shipping_address = shippingAddress
    orderAfterPaid.payment_status = PAID
    await orderAfterPaid.save()
    session.commitTransaction()
  } catch (err) {
    session.abortTransaction()
    throw new AppError(err.message, err.statusCode)
  } finally {
    session.endSession()
  }
  return orderAfterPaid
}

const completeOrder = async (orderId) => {
  console.log(orderId)
  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new AppError('Order not found', 404)
  }

  switch (order.order_status) {
    case SHIPPING:
      order.order_status = COMPLETED
      order.time_completed = Date.now()
      return await order.save()
    case COMPLETED:
      throw new AppError('Order already completed', 409)
    default:
      throw new AppError('Order cannot be completed', 409)
  }
}

const cancelOrder = async (orderCancel) => {
  let orderConfirmed
  const session = await connection.startSession()
  try {
    session.startTransaction()
    const { order_id: orderId, reason } = orderCancel
    const order = await Order.findById(orderId)
    const isOrderProcessed = order.order_status === PROCESSING && order.payment_status === PAID
    if (!order) {
      throw new AppError('Order not found', 404)
    } else if (!isOrderProcessed) {
      throw new AppError('Order cannot cancel because it has been processed', 409)
    }

    const userId = order.user_id
    const amount = order.order_total
    const action = DEPOSIT
    const paymentInternalAccountInfo = {
      user_id: userId,
      amount,
      action
    }
    updateBalanceForInternalAccount(paymentInternalAccountInfo)

    order.order_status = CANCELED
    order.payment_status = REFUNDED
    order.cancel_reason = reason
    orderConfirmed = order.save()
    session.commitTransaction()
  } catch (error) {
    session.abortTransaction()
  } finally {
    session.endSession()
  }
  return orderConfirmed
}

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  confirmOrder,
  completeOrder,
  cancelOrder,
  deleteOrder,
  deleteAll
}
