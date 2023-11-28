const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const FavoriteService = require('./favorite-service')

const getFavorites = catchAsyncHandler(async (req, res) => {
  const favorites = await FavoriteService.getFavorites()
  return res.status(200).json({
    status: 'success',
    data: favorites
  })
})

const getFavorite = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params.id
  const favorite = await FavoriteService.getFavorite(id)
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
const createFavorite = catchAsyncHandler(async (req, res, next) => {})
const updateFavorite = catchAsyncHandler(async (req, res, next) => {})
const deleteFavorite = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getFavorites,
  getFavorite,
  createFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite
}
