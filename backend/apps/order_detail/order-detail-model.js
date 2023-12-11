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
  price: {
    type: Number,
    require: [true, 'Dish price is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Dish quantity is required'],
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
