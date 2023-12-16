const AppError = require('../error/app-error')
const Order = require('./model/order-model')
const UserService = require('../user/user-service')
const OrderDetailService = require('../order_detail/order-detail-service')
const connection = require('../../db/connection')
const { processPayment, updateBalanceForInternalAccount, checkInternalAccountEnoughBalance } = require('../payment/payment-service')
const { PROCESSING, CANCELED } = require('../../constant/order-status')
const { PAID, REFUNDED } = require('../../constant/payment-status')
const { WITHDRAW } = require('../../constant/payment-action')

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
    const isInternalAccountEnoughBalance = await checkInternalAccountEnoughBalance(userId, order.order_total)
    console.log(isInternalAccountEnoughBalance)
    if (!isInternalAccountEnoughBalance) {
      throw new AppError('Account not enough balance', 422)
    }
    const orderCreated = await Order.create([order], { session })
    await OrderDetailService.createOrderDetails(orderCreated[0]._id, orderItems, { session })
    await session.commitTransaction()
    return orderCreated
  } catch (error) {
    console.log(error)
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

const deleteAll = async () => {
  await Order.deleteMany({})
  await OrderDetailService.deleteAll()
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
    order.payment_status = paymentStatus
    order.save()
    order.order_status = PROCESSING
    order.shipping_address = shippingAddress
    order.payment_status = PAID
    await order.save()
    session.commitTransaction()
  } catch (err) {
    session.abortTransaction()
  }
}

const cancelOrder = async (orderCancel) => {
  const session = await connection.createSession()
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
    const amount = order.total
    const action = WITHDRAW
    const paymentInternalAccountInfo = {
      user_id: userId,
      amount,
      action
    }
    updateBalanceForInternalAccount(paymentInternalAccountInfo)

    order.order_status = CANCELED
    order.payment_status = REFUNDED
    order.cancel_reason = reason
    order.save()
    session.commitTransaction()
  } catch (error) {
    session.abortTransaction()
  }
}

module.exports = {
  getOrders,
  getOrder,
  confirmOrder,
  createOrder,
  cancelOrder,
  updateOrder,
  deleteOrder,
  deleteAll
}
