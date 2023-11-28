const AppError = require('../error/app-error')
const Favorite = require('./favorite-model')

const getFavorites = async () => {
  return await Favorite.find({}).populate({ path: 'category', select: 'name' })
}

const getFavorite = async (id) => {
  const favorite = await Favorite.findById(id)
  if (!favorite) {
    return null
  }
  return favorite
}

const createFavorites = async (favorites) => {
  return await Favorite.insertMany(favorites)
}

const createFavorite = async (favorite) => {
  try {
    return await Favorite.create(favorite)
  } catch (error) {
    throw new AppError(error)
  }
}

const updateFavorite = async (favorite) => {

}

const deleteFavorite = async (favorite) => {

}

module.exports = {
  getFavorites,
  getFavorite,
  createFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite
}
