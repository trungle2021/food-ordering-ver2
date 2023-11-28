const express = require('express')
const router = express.Router()
const CategoryController = require('../category/category-controller')

router.route('/:id')
  .get(CategoryController.getCategory)
  .get(CategoryController.deleteCategory)
  .put(CategoryController.updateCategory)

router.route('/')
  .get(CategoryController.getCategories)
  .post(CategoryController.createCategory)

module.exports = router
