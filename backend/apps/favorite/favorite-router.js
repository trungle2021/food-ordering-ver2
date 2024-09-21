const express = require('express');
const router = express.Router();
const {
  getFavoriteByUserId,
  createFavoriteDish,
  deleteFavorite,
  deleteAllFavorite,
} = require('../favorite/favorite-controller');
const {
  deleteFavoriteRequestSchema,
  getFavoriteByUserIdRequestSchema,
  upsertFavoriteRequestSchema,
} = require('../favorite/favorite-request-validator');
const validateRequest = require('../../utils/joi/validate-request-schema');
const { PARAMS, BODY } = require('../../constant/request-types');

router
  .route('/:favoriteId')
  .delete(validateRequest(deleteFavoriteRequestSchema, [PARAMS]), deleteFavorite);

router
  .route('/user/:userId')
  .get(validateRequest(getFavoriteByUserIdRequestSchema, [PARAMS]), getFavoriteByUserId);

router.route('/').delete(deleteAllFavorite);

router.route('/').post(validateRequest(upsertFavoriteRequestSchema, [BODY]), createFavoriteDish);

module.exports = router;
