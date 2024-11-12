const mongoose = require('mongoose');
const orderStatus = require('../../constant/order-status');
const paymentStatus = require('../../constant/payment-status');
const paymentMethod = require('../../constant/payment-method');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  order_details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderDetail',
    },
  ],
  order_total: {
    type: Number,
    default: 0,
    required: [true, 'Order Total is required'],
    min: 0,
  },
  order_status: {
    type: String,
    enum: Object.values(orderStatus),
    require: [true, 'Order Status is required'],
    default: orderStatus.PENDING,
  },
  payment_status: {
    type: String,
    enum: Object.values(paymentStatus),
    require: [true, 'Payment Status is required'],
    default: paymentStatus.PENDING,
  },
  payment_method: {
    type: String,
    validate: {
      validator: (value) => {
        if (value === null) {
          return true;
        }
        return Object.values(paymentMethod).includes(value);
      },
      message: 'Invalid Payment Method',
    },
    default: null,
  },
  shipping_address: {
    type: String,
    require: [true, 'Shipping Address is required'],
  },
  order_date: {
    type: Date,
    required: [true, 'Order Date is required'],
  },
  cancel_reason: {
    type: ObjectId,
    ref: 'CancelReason',
  },
  time_completed: {
    type: Date,
    default: null,
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
