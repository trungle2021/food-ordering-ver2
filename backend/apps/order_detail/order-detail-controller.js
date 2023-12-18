const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const OrderDetailService = require('./order-detail-service')

const getOrderDetails = catchAsyncHandler(async (req, res) => {
  const orderdetails = await OrderDetailService.getOrderDetails({})
  return res.status(200).json({
    status: 'success',
    data: orderdetails
  })
})

const getOrderDetail = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params
  const orderdetail = await OrderDetailService.getOrderDetail(id)
  if (!orderdetail) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: orderdetail
  })
})

const createOrderDetails = catchAsyncHandler(async (req, res, next) => {
  const listOrderDetails = req.body
  const orderdetails = await OrderDetailService.createOrderDetails(listOrderDetails)
  return res.status(200).json({
    status: 'success',
    data: orderdetails
  })
})
const createOrderDetail = catchAsyncHandler(async (req, res, next) => {})
const updateOrderDetail = catchAsyncHandler(async (req, res, next) => {})
const deleteOrderDetail = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getOrderDetails,
  getOrderDetail,
  createOrderDetails,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail
}
