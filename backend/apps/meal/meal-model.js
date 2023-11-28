const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})

const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal
