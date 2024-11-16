const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ratingSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
      },
      dish: {
        type: ObjectId,
        ref: 'Dish',
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      review: {
        type: String,
        maxlength: 500,
      },
      timestamps: true
})

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;