const express = require('express');
const router = express.Router();
const {
  searchDishesByFullTextSearch,
  createDishes,
  getDish,
  deleteDish,
  updateDish,
  getDishes,
  createDish,
} = require('../dish/dish-controller');
const validateRequest = require('../../utils/joi/validate-request-schema');
const {
  searchDishesByFullTextSearchRequestSchema,
  getDishRequestSchema,
  deleteDishRequestSchema,
  updateDishRequestSchema,
  createDishRequestSchema,
} = require('./dish-request-validator');
const { PARAMS, BODY, QUERY } = require('../../constant/request-types');


router.route('/bulk').post(createDishes);

router
  .route('/search')
  .get(
    validateRequest(searchDishesByFullTextSearchRequestSchema, [QUERY]),
    searchDishesByFullTextSearch
  );

router
  .route('/:dishId')
  .get(validateRequest(getDishRequestSchema, [PARAMS]), getDish)
  .delete(validateRequest(deleteDishRequestSchema, [PARAMS]), deleteDish);

router
  .route('/')
  .get(getDishes)
  .post(validateRequest(createDishRequestSchema, [BODY]), createDish)
  .put(validateRequest(updateDishRequestSchema, [BODY]), updateDish);

module.exports = router;
