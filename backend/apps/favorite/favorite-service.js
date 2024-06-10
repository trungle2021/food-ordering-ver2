const { convertToObjectId } = require('../../utils/mongoose/mongoose-utils')
const AppError = require('../../utils/error/app-error')
const Favorite = require('./favorite-model')

const getFavorites = async () => {
  // return await Favorite.find({}).populate({ path: 'category', select: 'name' })
}

const getFavoriteByUserId = async (id) => {
  const userId = await convertToObjectId(id)
  console.log(userId)
  return await Favorite.find({ user: userId }).populate('dish')
}

const createFavorites = async (favorites) => {
  return await Favorite.insertMany(favorites)
}

const createFavorite = async (favoriteReqBody) => {
  const favorite = new Favorite({
    user: favoriteReqBody.user_id,
    dish: favoriteReqBody.dish_id
  })

  const populatedFavorite = await favorite.populate('user dish').execPopulate()
  if (!populatedFavorite.user || !populatedFavorite.dish) {
    // userId or dishId not exists
    throw new AppError('User Or Dish not exists', 404)
    // handle validation error
  } else {
    // Both userId and dishId exist, proceed with saving the favorite record
    return await populatedFavorite.save()
  }
}

const updateFavorite = async (favorite) => {

}

const deleteFavorite = async (favorite) => {

}

module.exports = {
  getFavorites,
  getFavoriteByUserId,
  createFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite
}
