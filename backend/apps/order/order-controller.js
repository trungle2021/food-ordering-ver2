const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const OrderConfirmInputSchema = require('./model/order-confirm-info-model')
const OrderService = require('./order-service')
const orderCancelSchema = require('./model/order-cancel-model')
const getOrders = catchAsyncHandler(async (req, res) => {
  const orders = await OrderService.getOrders()
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
  const body = req.body

  const userId = body.user_id
  const orderDate = body.order_date
  const orderTotal = body.order_total
  const shippingAddress = body.shipping_address
  const orderItems = body.order_items

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
  const body = req.body
  const orderConfirm = OrderConfirmInputSchema.validate(body)
  if (!orderConfirm.result) {
    return res.status(400).json({
      status: 'fail',
      error: orderConfirm
    })
  }
  await OrderService.confirmOrder(orderConfirm.data)
  return res.status(200).json({
    status: 'success',
    message: 'Order Successfully'
  })
})

const cancelOrder = catchAsyncHandler(async (req, res, next) => {
  const body = req.body
  const orderCancel = orderCancelSchema.validate(body)
  if (!orderCancel.result) {
    return res.status(400).json({
      status: 'fail',
      error: orderCancel
    })
  }
  await OrderService.confirmOrder(orderCancel.data)
})
const updateOrder = catchAsyncHandler(async (req, res, next) => {})
const deleteOrder = catchAsyncHandler(async (req, res, next) => {})
const deleteAll = catchAsyncHandler(async (req, res, next) =>{
  console.log('Delete')
  await OrderService.deleteAll()
  return res.status(200).json({
    status:'success',
    message: 'All orders deleted'
  })
})

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  cancelOrder,
  confirmOrder,
  updateOrder,
  deleteOrder,
  deleteAll
}
