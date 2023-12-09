const mongoose = require('mongoose')
const orderStatus = require('../../constant/order-status')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  order_status: {
    type: String,
    enum: Object.values(orderStatus),
    default: orderStatus.PENDING
  },
  payment_status: {
    type: String,
    enum: Object.values(orderStatus),
    require: [true, 'Payment Status is required']
  },
  address_shipping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAddress'
  },
  sub_total: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    default: 0,
    min: 0
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
