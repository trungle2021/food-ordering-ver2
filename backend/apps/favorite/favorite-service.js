const Favorite = require('./favorite-model')

const getFavorites = async (queryString) => {
  return await Favorite.find(queryString).populate({ path: 'category', select: 'name' })
}

const getFavorite = async (filter) => {
  return await Favorite.findOne(filter)
}

const createFavorite = async (payload) => {
  return await Favorite.create(payload)
}

const deleteFavorite = async (filter) => {
  return await Favorite.deleteOne(filter)
}

module.exports = {
  getFavorites,
  getFavorite,
  createFavorite,
  deleteFavorite
}
