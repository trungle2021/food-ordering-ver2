const mongoose = require('mongoose')

// name, password, balance, phone, email, created_at, updated_at
const userAddressSchema = new mongoose.Schema({
})

const UserAddress = mongoose.model('UserAddress', userAddressSchema)

module.exports = UserAddress
