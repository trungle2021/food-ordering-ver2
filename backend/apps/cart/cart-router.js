const express = require('express')
const router = express.Router()
const CartController = require('../cart/cart-controller')

router.route('/user/:id')
  .get(CartController.getCartByUserId)

router.route('/')
  .get(CartController.getCarts)
  .post(CartController.addItem)
  .delete(CartController.removeItem)
  .put(CartController.updateItem)

module.exports = router
