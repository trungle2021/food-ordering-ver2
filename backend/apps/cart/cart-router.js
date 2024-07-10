const express = require('express')
const router = express.Router()
const CartController = require('../cart/cart-controller')



router.route('/dish/:dishId')
  .delete(CartController.removeItem)

router.route('/')
  .get(CartController.getCartByUserId)
  .post(CartController.addItem)
  .put(CartController.updateItem)

module.exports = router
