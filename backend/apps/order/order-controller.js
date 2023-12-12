const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const { validateOrderConfirmInput } = require('../order_detail/order-confirm-info-model')
const OrderService = require('./order-service')

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
  const orderSubtotal = body.order_subtotal
  const shippingAddress = body.shipping_address
  const orderItems = body.order_items

  const order = {
    user: userId,
    order_date: orderDate,
    order_subtotal: orderSubtotal,
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
  const orderConfirmInfoValid = validateOrderConfirmInput(body)
  const confirmOrder = await OrderService.confirmOrder(orderConfirmInfoValid)
  if (confirmOrder) {
    return res.status(200).json({
      status: 'success',
      
    })
  }
})
const updateOrder = catchAsyncHandler(async (req, res, next) => {})
const deleteOrder = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  confirmOrder,
  updateOrder,
  deleteOrder
}
