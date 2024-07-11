const express = require('express')
const router = express.Router()
const OrderController = require('../order/order-controller')

router.route('/recent-orders/users/:user_id')
  .get(OrderController.getRecentOrders)

router.route('/confirm/:order_id')
  .post(OrderController.confirmOrder)

router.route('/complete/:order_id')
  .post(OrderController.completeOrder)

router.route('/cancel/:order_id')
  .post(OrderController.cancelOrder)

router.route('/history/users/:user_id')
  .get(OrderController.getOrderHistory)

router.route('/:order_id')
  .get(OrderController.getOrder)
  .get(OrderController.deleteOrder)

router.route('/')
  .get(OrderController.getOrders)
  .post(OrderController.createOrder)
  .delete(OrderController.deleteAll)

module.exports = router
