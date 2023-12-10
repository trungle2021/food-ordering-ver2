const mongoose = require('mongoose')
const orderStatus = require('../../constant/order-status')
const paymentStatus = require('../../constant/payment-status')
const paymentMethod = require('../../constant/payment-method')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  order_status: {
    type: String,
    enum: Object.values(orderStatus)
  },
  payment_method: {
    type: String,
    enum: Object.values(paymentMethod),
    require: [true, 'Payment Method is required']
  },
  payment_status: {
    type: String,
    enum: Object.values(paymentStatus),
    require: [true, 'Payment Status is required']
  },
  shipping_address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAddress'
  },
  order_subtotal: {
    type: Number,
    default: 0,
    min: 0
  },
  order_total: {
    type: Number,
    default: 0,
    min: 0
  },
  order_date: {
    type: Date,
    required: [true, 'Order Date is required']
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
