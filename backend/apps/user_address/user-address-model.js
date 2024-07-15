const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const userAddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  recipient: {
    type: String,
    required: [true, 'Recipient is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required']
  },
  is_default_address: {
    type: Boolean,
    default: false
  },
  user: {
    type: ObjectId,
    ref: 'User'
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

const UserAddress = mongoose.model('UserAddress', userAddressSchema)

module.exports = UserAddress
