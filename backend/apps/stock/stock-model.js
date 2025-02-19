const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const stockSchema = new mongoose.Schema({
  dish: {
    type: ObjectId,
    required: true,
    ref: 'Dish',
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  }
}, { timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
