const OrderDetail = require('./order-detail-model')

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
