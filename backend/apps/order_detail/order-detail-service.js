const OrderDetail = require('./order-detail-model')
const AppError = require('../../utils/error/app-error')

const getOrderDetails = async (filter) => {
  return await OrderDetail.find(filter)
    // .populate({ path: 'order' })
    .populate({ path: 'dish', select: 'name' })
}

const getOrderDetail = async (id) => {
  const orderdetail = await OrderDetail.findById(id)
  if (!orderdetail) {
    return null
  }
  return orderdetail
}

const createOrderDetails = async (orderId, orderItems, session) => {
  if (!session) throw new AppError('Session is required', 500)
  const orderDetailModified = orderItems.map(item => {
    return {
      order: orderId,
      dish: item.dish._id,
      quantity: item.quantity,
      price: item.price
    }
  })
  return await OrderDetail.insertMany(orderDetailModified, session)
}

const createOrderDetail = async (orderdetail, options) => {
  return await OrderDetail.create(orderdetail)
}

const updateOrderDetail = async (orderdetail) => {

}

const deleteOrderDetail = async (orderdetail) => {

}

const deleteAll = async () => {
  await OrderDetail.deleteMany({})
}
module.exports = {
  getOrderDetails,
  getOrderDetail,
  createOrderDetails,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
  deleteAll
}
