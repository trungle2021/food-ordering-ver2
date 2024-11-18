const Favorite = require('./favorite-model');

const getFavorites = async (queryString) => {
  return await Favorite.find(queryString).populate({ path: 'category', select: 'name' });
};

const getFavorite = async (filter) => {
  const favorites = await Favorite.find(filter).populate('dish');
  return favorites.map(favorite => ({
    _id: favorite.dish._id,
    image: favorite.dish.image,
    rating: {
      averageRating: favorite.dish.rating.averageRating || 4,
      totalRating: favorite.dish.rating.totalRating || 1,
    },
    name: favorite.dish.name,
    price: favorite.dish.price,
    isFavorite: true,
  }));
};

const createFavoriteDish = async (payload) => {
  const existingFavorite = await Favorite.findOne(payload);
  if (!existingFavorite) {
    return await Favorite.create(payload);
  }
  return existingFavorite;
};

const deleteFavorite = async (filter) => {
  return await Favorite.deleteOne(filter);
};

const deleteAllFavorite = async () => {
  return await Favorite.deleteMany({});
};

module.exports = {
  getFavorites,
  getFavorite,
  createFavoriteDish,
  deleteFavorite,
  deleteAllFavorite,
};
