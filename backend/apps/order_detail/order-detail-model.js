const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderdetailSchema = new mongoose.Schema({
  order: {
    type: ObjectId,
    ref: 'Order',
    required: [true, 'Order ID is required']
  },
  dish: {
    type: ObjectId,
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
