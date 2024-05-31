const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const OrderConfirmInputSchema = require('./order-confirm-info-schema')
const OrderService = require('./order-service')
const orderCancelSchema = require('./model/order-cancel-model')

const getOrders = catchAsyncHandler(async (req, res) => {
  const orders = await OrderService.getOrders({})
  return res.status(200).json({
    status: 'success',
    data: orders
  })
})

const getRecentOrders = catchAsyncHandler(async (req, res, next) => {
  const userId = req.userId
  const queryString = { ...req.query }
  const recentOrders = await OrderService.getRecentOrders(userId, queryString)
  return res.status(200).json({
    status: 'success',
    data: recentOrders
  })
})

const getOrder = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params.id
  const order = await OrderService.getOrder(id)
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

const createOrder = catchAsyncHandler(async (req, res, next) => {
  const payload = req.body
  const userId = req.userId
  const {
    order_date: orderDate,
    shipping_address: shippingAddress,
    order_items: orderItems
  } = payload

  const order = {
    user: userId,
    order_date: orderDate,
    shipping_address: shippingAddress
  }

  const orderCreated = await OrderService.createOrder(order, orderItems)
  res.status(200).json({
    status: 'success',
    data: orderCreated
  })
})

const confirmOrder = catchAsyncHandler(async (req, res, next) => {
  const { id: orderId } = req.params
  const payload = req.body

  const orderConfirmValidation = OrderConfirmInputSchema.validate(payload)
  if (!orderConfirmValidation.result) {
    return res.status(400).json({
      status: 'fail',
      error: orderConfirmValidation
    })
  }

  const orderConfirmInfo = {
    order_id: orderId,
    ...payload
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
  const { id: orderId } = req.params
  const payload = req.body
  const validateOrderCancelInput = orderCancelSchema.validate(payload)
  if (!validateOrderCancelInput.result) {
    return res.status(400).json({
      status: 'fail',
      error: validateOrderCancelInput
    })
  }
  const orderCancel = {
    order_id: orderId,
    ...payload
  }
  await OrderService.cancelOrder(orderCancel)
  return res.status(200).json({
    status: 'success',
    message: 'Order Cancelled Successfully'
  })
})

const completeOrder = catchAsyncHandler(async (req, res, next) => {
  const { id: orderId } = req.params
  const order = await OrderService.completeOrder(orderId)
  return res.status(200).json({
    status: 'success',
    data: order
  })
})

const deleteOrder = catchAsyncHandler(async (req, res, next) => {})

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
  createOrder,
  cancelOrder,
  confirmOrder,
  completeOrder,
  deleteOrder,
  deleteAll
}
