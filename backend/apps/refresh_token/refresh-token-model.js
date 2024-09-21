const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: 'string',
      required: true,
      unique: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
