const mongoose = require('mongoose')
const paymentMethod = require('../../constant/payment-method')
const paymentStatus = require('../../constant/payment-status')
const ObjectId = mongoose.Schema.Types.ObjectId

const transactionSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  payment_method: {
    type: String,
    enum: Object.values(paymentMethod),
    required: [true, 'Payment Method is required']
  },
  payment_status: {
    type: String,
    enum: Object.values(paymentStatus),
    required: [true, 'Payment Status is required']
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: null
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction
