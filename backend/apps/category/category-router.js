const express = require('express')
const router = express.Router()
const {
  getCategory,
  deleteCategory,
  updateCategory,
  createCategories,
  getCategories,
  createCategory
} = require('../category/category-controller')
const validateRequest = require('../../utils/joi/validate-request-schema')
const {
  getCategoryRequestSchema,
  deleteCategoryRequestSchema,
  updateCategoryRequestSchema,
  createCategoryRequestSchema
} = require('./category-request-validator')
const { PARAMS, BODY } = require('../../constant/request-types')

router.route('/:categoryId')
  .get(validateRequest(getCategoryRequestSchema, [PARAMS]), getCategory)
  .delete(validateRequest(deleteCategoryRequestSchema, [PARAMS]), deleteCategory)

router.route('/bulk')
  .post(createCategories)

router.route('/')
  .get(getCategories)
  .post(validateRequest(createCategoryRequestSchema, [BODY]), createCategory)
  .put(validateRequest(updateCategoryRequestSchema, [BODY]), updateCategory)

module.exports = router
