const express = require('express')
const router = express.Router()
const CartController = require('../cart/cart-controller')

router.route('/user/:id')
  .get(CartController.getCartByUserId)
  .delete(CartController.deleteCart)
  .put(CartController.updateCart)

router.route('/bulk')
  .post(CartController.createCarts)

router.route('/')
  .get(CartController.getCarts)
  .post(CartController.createCart)

module.exports = router
