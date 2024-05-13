const AppError = require('../error/app-error')
const Order = require('./model/order-model')
const UserService = require('../user/user-service')
const OrderDetailService = require('../order_detail/order-detail-service')
const connection = require('../../db/connection')
const { processPayment } = require('../payment/payment-service')
const { PROCESSING, COMPLETED, SHIPPING } = require('../../constant/order-status')
const { PAID } = require('../../constant/payment-status')
const ApiFeatures = require('../../utils/api-features/api-features')
const { convertToObjectId } = require('../../utils/mongoose/mongoose-utils')

const getOrders = async (queryString) => {
  const features = new ApiFeatures(Order.find(), queryString)
    .filter()
    .limitFields()
    .sort()
    .paginate()

  return await features.query
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
    const user = await UserService.getUser({ _id: userId })
    if (!user) {
      throw new AppError(`Cannot found User with ID: ${userId}`, 404)
    }

    const orderTotal = orderItems.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)

    const clonedObj = { ...order, order_total: orderTotal }

    const orderCreated = await Order.create([order], { session })
    await OrderDetailService.createOrderDetails(orderCreated[0]._id, orderItems, { session })
    await session.commitTransaction()
    return orderCreated
  } catch (error) {
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

const getRecentOrders = async (userId, queryString) => {
  const userIdConverted = await convertToObjectId(userId)

  const recentOrders = await Order.find({
    order_status: COMPLETED,
    user: userIdConverted
  })
    .populate({
      path: 'order_details',
      populate: [
        {
          path: 'order',
          model: 'Order'
        },
        {
          path: 'dish',
          model: 'Dish'
        }
      ]
    })
    .exec()
  return recentOrders
}

const cancelOrder = async (orderCancel) => {
}

module.exports = {
  getOrders,
  getOrder,
  getRecentOrders,
  createOrder,
  confirmOrder,
  completeOrder,
  cancelOrder,
  deleteOrder,
  deleteAll
}
