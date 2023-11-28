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

// Tạo một chỉ mục riêng biệt cho trường name
// categorySchema.index({ name: 1 }, { unique: true })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
