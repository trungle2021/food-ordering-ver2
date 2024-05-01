const mongoose = require('mongoose');
const { convertToMiliseconds } = require('../../utils/date-time/convertStringTimeToMiliseconds');
const refreshTokenExpired = process.env.JWT_REFRESH_TOKEN_EXPIRATION
const ObjectId = mongoose.Schema.Types.ObjectId
const moment = require('moment')

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
  }},
{
  timestamps: true
})

console.log("RefreshToken Expired Time ENV: " + refreshTokenExpired)
const currentTime = moment(); // Lấy thời gian hiện tại
console.log("Current Time: " + currentTime)
const modifiedTime = currentTime.add(convertToMiliseconds(refreshTokenExpired), 'milliseconds'); // Cộng thêm 200 milliseconds
console.log("After add refresh token expired time: " + modifiedTime)
const expiredAtUtcTime = modifiedTime.utc(); // Chuyển đổi thành múi giờ UTC
console.log("Convert modified time to UTC: " + expiredAtUtcTime)


refreshTokenSchema.index({ createdAt: 1 }, { expireAfterMilliseconds: expiredAtUtcTime });

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)

module.exports = RefreshToken
