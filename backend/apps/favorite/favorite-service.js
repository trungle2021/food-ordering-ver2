const Favorite = require('./favorite-model')

const getFavorites = async (queryString) => {
  return await Favorite.find(queryString).populate({ path: 'category', select: 'name' })
}

const getFavorite = async (filter) => {
  return await Favorite.find(filter)
}

const createFavoriteDish = async (payload) => {
  return await Favorite.create(payload)
}

const deleteFavorite = async (filter) => {
  return await Favorite.deleteOne(filter)
}

const deleteAllFavorite = async () => {
  return await Favorite.deleteMany({})
}

module.exports = {
  getFavorites,
  getFavorite,
  createFavoriteDish,
  deleteFavorite,
  deleteAllFavorite
}
