const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  category: {
    type: ObjectId,
    ref: 'Category',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
  },
});

dishSchema.index({ name: 'text', description: 'text', price: 'number' });
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
