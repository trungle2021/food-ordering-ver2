const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const OrderConfirmInputSchema = require('./validation-schema/order-confirm-info-schema')
const OrderService = require('./order-service')
const orderCancelSchema = require('./validation-schema/order-cancel-model')

const getOrders = catchAsyncHandler(async (req, res) => {
  const queryString = { ...req.query }
  const orders = await OrderService.getOrders(queryString)
  return res.status(200).json({
    status: 'success',
    data: orders
  })
})

const getRecentOrders = catchAsyncHandler(async (req, res, next) => {
  // ! Need to validate request body

  const { user_id: userId } = req.params
  const queryString = { ...req.query }
  const recentOrders = await OrderService.getRecentOrders(userId, queryString)
  return res.status(200).json({
    status: 'success',
    data: recentOrders
  })
})

const getOrder = catchAsyncHandler(async (req, res, next) => {
  // ! Need to validate request body

  const { order_id: orderId } = req.params.id
  const order = await OrderService.getOrder(orderId)
  if (!order) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: order
  })
})

const getOrderHistory = catchAsyncHandler(async (req, res, next) => {
  // ! Need to validate request body

  const { user_id: userId } = req.params
  const queryString = { ...req.query }
  const { totalItems, totalPages, orders } = await OrderService.getOrderHistory(userId, queryString)
  return res.status(200).json({
    status: 'success',
    data: {
      totalItems,
      totalPages,
      orders
    }
  })
})

const createOrder = catchAsyncHandler(async (req, res, next) => {
  const orderConfirmValidation = OrderConfirmInputSchema.validate(req.body)

  if (!orderConfirmValidation.isValid) {
    return res.status(400).json({
      status: 'fail',
      error: orderConfirmValidation
    })
  }

  const {
    order_date: orderDate,
    shipping_address: shippingAddress,
    user_id: userId
  } = req.body

  const order = {
    user: userId,
    order_date: orderDate,
    shipping_address: shippingAddress
  }

  const orderCreated = await OrderService.createOrder(order)
  res.status(200).json({
    status: 'success',
    data: orderCreated
  })
})

const confirmOrder = catchAsyncHandler(async (req, res, next) => {
  // ! Need to validate request body

  const { order_id: orderId } = req.params

  const orderConfirmValidator = OrderConfirmInputSchema.validate(req.body)

  if (!orderConfirmValidator.isValid) {
    return res.status(400).json({
      status: 'fail',
      error: orderConfirmValidator
    })
  }

  const orderConfirmInfo = {
    order_id: orderId,
    ...req.body
  }

  const orderConfirmed = await OrderService.confirmOrder(orderConfirmInfo)
  if (orderConfirmed) {
    return res.status(200).json({
      status: 'success',
      message: 'Order Successfully'
    })
  } else {
    return res.status(500).json({
      status: 'fail',
      message: 'Order Failed'
    })
  }
})

const cancelOrder = catchAsyncHandler(async (req, res, next) => {
  // ! Need to validate request body

  const { order_id: orderId } = req.params
  const validateOrderCancelInput = orderCancelSchema.validate(req.body)
  if (!validateOrderCancelInput.result) {
    return res.status(400).json({
      status: 'fail',
      error: validateOrderCancelInput
    })
  }
  const orderCancel = {
    order_id: orderId,
    ...req.body
  }
  await OrderService.cancelOrder(orderCancel)
  return res.status(200).json({
    status: 'success',
    message: 'Order Cancelled Successfully'
  })
})

const completeOrder = catchAsyncHandler(async (req, res, next) => {
  // ! Need to validate request body

  const { order_id: orderId } = req.params
  const order = await OrderService.completeOrder(orderId)
  return res.status(200).json({
    status: 'success',
    data: order
  })
})

const deleteOrder = catchAsyncHandler(async (req, res, next) => { })

const deleteAll = catchAsyncHandler(async (req, res, next) => {
  await OrderService.deleteAll()
  return res.status(200).json({
    status: 'success',
    message: 'All orders deleted'
  })
})

module.exports = {
  getOrders,
  getRecentOrders,
  getOrder,
  getOrderHistory,
  createOrder,
  cancelOrder,
  confirmOrder,
  completeOrder,
  deleteOrder,
  deleteAll
}
