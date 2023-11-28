const express = require('express')
const router = express.Router()
const CartController = require('../cart/cart-controller')

router.route('/:id')
  .get(CartController.getCart)
  .get(CartController.deleteCart)
  .put(CartController.updateCart)

router.route('/bulk')
  .post(CartController.createCarts)

router.route('/')
  .get(CartController.getCarts)
  .post(CartController.createCart)

module.exports = router
