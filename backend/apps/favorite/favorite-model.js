const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const favoriteSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  dish: {
    type: ObjectId,
    ref: 'Dish',
  }
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
