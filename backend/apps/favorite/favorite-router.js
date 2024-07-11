const express = require('express')
const router = express.Router()
const FavoriteController = require('../favorite/favorite-controller')

router.route('/:id')
  .get(FavoriteController.deleteFavorite)

router.route('/user/:user_id')
  .get(FavoriteController.getFavoriteByUserId)

router.route('/bulk')
  .post(FavoriteController.createFavorites)

router.route('/')
  .get(FavoriteController.getFavorites)
  .post(FavoriteController.createFavorite)
  .put(FavoriteController.updateFavorite)

module.exports = router
