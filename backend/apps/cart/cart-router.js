const express = require('express')
const router = express.Router()
const CartController = require('../cart/cart-controller')

router.route('/user/:id')
  .get(CartController.getCartByUserId)

router.route('/user/:userId/dish/:dishId')
  .delete(CartController.removeItem)

router.route('/')
  .get(CartController.getCarts)
  .post(CartController.addItem)
  .put(CartController.updateItem)

module.exports = router
