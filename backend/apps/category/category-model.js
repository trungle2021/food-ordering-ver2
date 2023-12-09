const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true,
    required: [true, 'Name is required']
  },
  image: {
    type: String
  }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
