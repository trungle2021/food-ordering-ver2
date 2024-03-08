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

const createFavorite = async (favoriteReqBody) => {
  try {
    const favorite = new Favorite({
      user: favoriteReqBody.userId,
      dish: favoriteReqBody.dishId
    })

    favorite.populate('user dish').execPopulate((err, populatedFavorite) => {
      if (err) {
        // handle error
      } else if (!populatedFavorite.user || !populatedFavorite.dish) {
        // userId or dishId not exists
        // handle validation error
      } else {
        // Both userId and dishId exist, proceed with saving the favorite record
        populatedFavorite.save((saveError, savedFavorite) => {
          if (saveError) {
            // handle save error
          }
          return savedFavorite
        })
      }
    })
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
