const express = require('express')
const router = express.Router()
const CartController = require('../cart/cart-controller')
const CartRequestValidator = require('./cart-request-validator')
const validateRequest = require('../../utils/joi/validate-request-schema')

router.route('/dish/:dishId')
  .delete(CartController.removeItem)

router.route('/users/:userId?')
  .get(validateRequest(CartRequestValidator.getCartByUserIdSchemaValidator), CartController.getCartByUserId)

// router.route('/items/:itemId')
//   .get(CartController.findItem)

router.route('/')
  .post(validateRequest(CartRequestValidator.addItemSchemaValidator), CartController.addItem)
  .put(validateRequest(CartRequestValidator.updateItemSchemaValidator), CartController.updateItem)

module.exports = router
