const mongoose = require('mongoose')

const orderdetailSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'Order ID is required']
  },
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    required: [true, 'Dish ID is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Dish Quantity is required'],
    min: 0
  },
  unit_price: {
    type: Number,
    required: [true, 'Unit Price is required'],
    min: 0
  },
  total_price: {
    type: Number,
    required: [true, 'Total Price is required'],
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

const OrderDetail = mongoose.model('OrderDetail', orderdetailSchema)

module.exports = OrderDetail
