const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: 'string',
    required: true,
    unique: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date
  }
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)

module.exports = RefreshToken
