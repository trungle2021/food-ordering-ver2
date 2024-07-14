const express = require('express')
const router = express.Router()
const {
  getFavoriteByUserId,
  createFavorite,
  deleteFavorite
} = require('../favorite/favorite-controller')
const {
  deleteFavoriteRequestSchema,
  getFavoriteByUserIdRequestSchema,
  createFavoriteRequestSchema
} = require('../favorite/favorite-request-validator')
const validateRequest = require('../../utils/joi/validate-request-schema')
const { PARAMS, BODY } = require('../../constant/request-types')

router.route('/:favoriteId')
  .delete(validateRequest(deleteFavoriteRequestSchema, PARAMS), deleteFavorite)

router.route('/user/:userId')
  .get(validateRequest(getFavoriteByUserIdRequestSchema, PARAMS), getFavoriteByUserId)

router.route('/')
  .post(validateRequest(createFavoriteRequestSchema, BODY), createFavorite)

module.exports = router
