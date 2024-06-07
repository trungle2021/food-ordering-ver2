const express = require('express')
const router = express.Router()
const OrderController = require('../order/order-controller')


router.route('/recent-orders')
  .get(OrderController.getRecentOrders)

router.route('/confirm/:id')
  .post(OrderController.confirmOrder)

router.route('/complete/:id')
  .post(OrderController.completeOrder)

router.route('/cancel/:id')
  .post(OrderController.cancelOrder)

router.route('/history')
  .get(OrderController.getOrderHistory)

router.route('/:id')
  .get(OrderController.getOrder)
  .get(OrderController.deleteOrder)

router.route('/')
  .get(OrderController.getOrders)
  .post(OrderController.createOrder)
  .delete(OrderController.deleteAll)

module.exports = router
