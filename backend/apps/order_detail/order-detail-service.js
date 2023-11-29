const AppError = require('../error/app-error')
const OrderDetail = require('./order-detail-model')

const getOrderDetails = async () => {
  return await OrderDetail.find({}).populate({ path: 'category', select: 'name' })
}

const getOrderDetail = async (id) => {
  const orderdetail = await OrderDetail.findById(id)
  if (!orderdetail) {
    return null
  }
  return orderdetail
}

const createOrderDetails = async (orderdetails) => {
  return await OrderDetail.insertMany(orderdetails)
}

const createOrderDetail = async (orderdetail) => {
  try {
    return await OrderDetail.create(orderdetail)
  } catch (error) {
    throw new AppError(error)
  }
}

const updateOrderDetail = async (orderdetail) => {

}

const deleteOrderDetail = async (orderdetail) => {

}

module.exports = {
  getOrderDetails,
  getOrderDetail,
  createOrderDetails,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail
}
