const express = require('express')
const router = express.Router()
const MealController = require('../meal/meal-controller')

router.route('/:id')
  .get(MealController.getMeal)
  .get(MealController.deleteMeal)
  .put(MealController.updateMeal)

router.route('/bulk')
  .post(MealController.createMeals)

router.route('/')
  .get(MealController.getMeals)
  .post(MealController.createMeal)

module.exports = router
