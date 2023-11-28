const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  items: [{
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Meal'
    },
    amount: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date
  }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
