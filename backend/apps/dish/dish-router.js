const express = require('express')
const router = express.Router()
const DishController = require('../dish/dish-controller')
const jwtFilterHandler = require('../../middleware/jwt-filter')

router.route('/popular-dishes')
  .get(jwtFilterHandler, DishController.getPoplularDishes)

router.route('/:id')
  .get(DishController.getDish)
  .get(DishController.deleteDish)
  .put(DishController.updateDish)

router.route('/bulk')
  .post(DishController.createDishes)

router.route('/')
  .get(DishController.getDishes)
  .post(DishController.createDish)

module.exports = router
