const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date
  }
})

const Balance = mongoose.model('Balance', balanceSchema)
module.exports = Balance
