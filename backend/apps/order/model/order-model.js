const mongoose = require('mongoose')
const orderStatus = require('../../../constant/order-status')
const paymentStatus = require('../../../constant/payment-status')
const paymentMethod = require('../../../constant/payment-method')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  order_status: {
    type: String,
    enum: Object.values(orderStatus),
    require: [true, 'Order Status is required'],
    default: orderStatus.PENDING
  },
  payment_status: {
    type: String,
    enum: Object.values(paymentStatus),
    require: [true, 'Payment Status is required'],
    default: paymentStatus.PENDING
  },
  payment_method: {
    type: String,
    validate: {
      validator: (value) => {
        if (value === null) {
          return true
        }
        return Object.values(paymentMethod).includes(value)
      },
      message: 'Invalid Payment Method'
    },
    default: null
  },
  shipping_address: {
    type: String,
    require: [true, 'Shipping Address is required']
  },
  order_total: {
    type: Number,
    default: 0,
    required: [true, 'Order Total is required'],
    min: 0
  },
  order_date: {
    type: Date,
    required: [true, 'Order Date is required']
  },
  cancel_reason: {
    type: String
  },
  order_detail: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderDetail'
    }
  ],
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
