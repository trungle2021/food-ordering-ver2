const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const FavoriteService = require('./favorite-service')

const getFavorites = catchAsyncHandler(async (req, res) => {
  const favorites = await FavoriteService.getFavorites()
  return res.status(200).json({
    status: 'success',
    data: favorites
  })
})

const getFavoriteByUserId = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const favorite = await FavoriteService.getFavorite({ user: userId })
  if (!favorite) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: favorite
  })
})

const createFavoriteDish = catchAsyncHandler(async (req, res, next) => {
  const { userId, dishId } = req.body
  const payload = {
    user: userId,
    dish: dishId
  }
  const favorite = await FavoriteService.createFavoriteDish(payload)
  return res.status(200).json({
    status: 'success',
    data: favorite
  })
})
const deleteFavorite = catchAsyncHandler(async (req, res, next) => {
  const { favoriteId } = req.params
  const favorite = await FavoriteService.deleteFavorite({ _id: favoriteId })
  if (!favorite) {
    return res.status(404).json({
      status: 'fail',
      message: 'Remove favorite failed'
    })
  }
  return res.status(200).json({
    status: 'success',
    data: favorite
  })
})
const deleteAllFavorite = catchAsyncHandler(async (req, res, next) => {
  const favorite = await FavoriteService.deleteAllFavorite()
  if (!favorite) {
    return res.status(404).json({
      status: 'fail',
      message: 'Remove favorite failed'
    })
  }
  return res.status(200).json({
    status: 'success'
  })
})

module.exports = {
  getFavorites,
  getFavoriteByUserId,
  createFavoriteDish,
  deleteFavorite,
  deleteAllFavorite
}
