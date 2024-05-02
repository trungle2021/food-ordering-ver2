const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const { convertToMiliseconds } = require('../../utils/date-time/convertStringTimeToMiliseconds')
const refreshTokenExpired = process.env.JWT_REFRESH_TOKEN_EXPIRATION
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
  expired_at: {
    type: Date,
    default: () => Date.now() + convertToMiliseconds(refreshTokenExpired.toString())
  }
},
{
  timestamps: true
})

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)

module.exports = RefreshToken
