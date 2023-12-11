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

const createOrderDetails = async (orderId, orderDetails, options) => {
  const orderDetailModified = orderDetails.map(item => {
    return {
      order: orderId,
      dish: item.dish_id,
      quantity: item.quantity,
      price: item.price
    }
  })

  if (options) {
    return await OrderDetail.insertMany(orderDetailModified, options)
  }

  return await OrderDetail.insertMany(orderDetailModified)
}

const createOrderDetail = async (orderdetail, options) => {
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
