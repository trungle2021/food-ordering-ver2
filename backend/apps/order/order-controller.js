const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const OrderConfirmInputSchema = require('./model/order-confirm-info-model')
const OrderService = require('./order-service')
const orderCancelSchema = require('./model/order-cancel-model')
const getOrders = catchAsyncHandler(async (req, res) => {
  const orders = await OrderService.getOrders({})
  return res.status(200).json({
    status: 'success',
    data: orders
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

  const {
    user_id: userId,
    order_date: orderDate,
    order_total: orderTotal,
    shipping_address: shippingAddress,
    order_items: orderItems
  } = payload

  const order = {
    user: userId,
    order_date: orderDate,
    order_total: orderTotal,
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
  console.log('Delete')
  await OrderService.deleteAll()
  return res.status(200).json({
    status: 'success',
    message: 'All orders deleted'
  })
})

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  cancelOrder,
  confirmOrder,
  completeOrder,
  deleteOrder,
  deleteAll
}
