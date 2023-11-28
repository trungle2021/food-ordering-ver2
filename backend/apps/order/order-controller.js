const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

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

const createOrders = catchAsyncHandler(async (req, res, next) => {
  const listOrders = req.body
  const orders = await OrderService.createOrders(listOrders)
  return res.status(200).json({
    status: 'success',
    data: orders
  })
})
const createOrder = catchAsyncHandler(async (req, res, next) => {})
const updateOrder = catchAsyncHandler(async (req, res, next) => {})
const deleteOrder = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getOrders,
  getOrder,
  createOrders,
  createOrder,
  updateOrder,
  deleteOrder
}
