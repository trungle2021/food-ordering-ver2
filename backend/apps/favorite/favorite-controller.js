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
  const { user_id: userId } = req.params
  const favorite = await FavoriteService.getFavoriteByUserId(userId)
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

const createFavorites = catchAsyncHandler(async (req, res, next) => {
  const listFavorites = req.body
  const favorites = await FavoriteService.createFavorites(listFavorites)
  return res.status(200).json({
    status: 'success',
    data: favorites
  })
})
const createFavorite = catchAsyncHandler(async (req, res, next) => {
  const favoriteReqBody = {
    user_id: req.body.user_id,
    dish_id: req.body.dish_id
  }
  const favorite = await FavoriteService.createFavorite(favoriteReqBody)
  return res.status(200).json({
    status: 'success',
    data: favorite
  })
})
const updateFavorite = catchAsyncHandler(async (req, res, next) => {})
const deleteFavorite = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getFavorites,
  getFavoriteByUserId,
  createFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite
}
