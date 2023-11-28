const express = require('express')
const router = express.Router()
const OrderController = require('../order/order-controller')

router.route('/:id')
  .get(OrderController.getOrder)
  .get(OrderController.deleteOrder)
  .put(OrderController.updateOrder)

router.route('/bulk')
  .post(OrderController.createOrders)

router.route('/')
  .get(OrderController.getOrders)
  .post(OrderController.createOrder)

module.exports = router
