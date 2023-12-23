const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const refreshTokenSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  expired_at: {
    type: Date
  },
  created_at: {
    type: Date
  }
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)

module.exports = RefreshToken
