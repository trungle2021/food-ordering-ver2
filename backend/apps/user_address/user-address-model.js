const mongoose = require('mongoose')

// name, password, balance, phone, email, created_at, updated_at
const userAddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  is_default_address: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
