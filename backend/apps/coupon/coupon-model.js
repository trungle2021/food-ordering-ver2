const mongoose = require('mongoose');

// Define the coupon schema
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Create the Coupon model
const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
