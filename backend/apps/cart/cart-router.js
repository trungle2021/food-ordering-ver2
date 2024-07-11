const express = require('express')
const router = express.Router()
const CartController = require('../cart/cart-controller')

router.route('/dish/:dishId')
  .delete(CartController.removeItem)

router.route('/users/:user_id')
  .get(CartController.getCartByUserId)

router.route('/items/:itemId')
  .get(CartController.findItem)

router.route('/')
  .post(CartController.addItem)
  .put(CartController.updateItem)

module.exports = router
