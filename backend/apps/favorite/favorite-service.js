const Favorite = require('./favorite-model');

const getFavorites = async (queryString) => {
  return await Favorite.find(queryString).populate({ path: 'category', select: 'name' });
};

const getFavorite = async (filter) => {
  const favorites = await Favorite.find(filter).populate('dish');
  return favorites.map(favorite => ({
    _id: favorite.dish._id,
    image: favorite.dish.image,
    itemSold: favorite.dish.itemSold || 0,
    ratingPoint: favorite.dish.ratingPoint || 3,
    discount: favorite.dish.discount || 0,
    name: favorite.dish.name,
    price: favorite.dish.price,
    favoriteInfo: {
      _id: favorite._id,
      user: favorite.user,
      dish: favorite.dish._id
    }
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
