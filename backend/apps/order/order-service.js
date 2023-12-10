const AppError = require('../error/app-error')
const Order = require('./order-model')
const UserService = require('../user/user-service')
const OrderDetailService = require('../order_detail/order-detail-service')
const TransactionService = require('../transaction/transaction-service')
const PaymentService = require('../../apps/payment/payment-service')
const orderStatus = require('../../constant/order-status')
const paymentStatus = require('../../constant/payment-status')
const { INTERNAL_ACCOUNT } = require('../../constant/payment-method')
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
    const orderId = order.order_id
    const userId = order.user_id
    const orderDate = order.order_date
    const orderSubtotal = order.order_subtotal
    const shippingAddress = order.shipping_address
    const paymentMethod = order.payment_method
    const coupon = order.coupon
    const orderItems = order.order_items

    const user = await UserService.getUser({ _id: userId })
    if (!user) {
      throw new AppError(`Cannot found User with ID: ${userId}`, 404)
    }

    const newOrder = {
      user: userId,
      order_status: orderStatus.PENDING,
      payment_status: paymentStatus.PENDING
    }

    const orderCreated = await Order.create(newOrder)
    await OrderDetailService.createOrderDetails(orderCreated._id, orderItems)
    if (paymentMethod === INTERNAL_ACCOUNT) {
      await PaymentService.updateBalanceForInternalAccount()
    }
    // const paymentStatus = payment.payment_status
    // const amount = transaction.amount
    const newTransaction = {
      user: userId,
      amount,
      payment_method: paymentMethod,
      paymentStatus
    }
    await TransactionService.createTransaction()

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
