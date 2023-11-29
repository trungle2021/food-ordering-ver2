const express = require('express')
const router = express.Router()
const OrderDetailController = require('./order-detail-controller')

router.route('/:id')
  .get(OrderDetailController.getOrderDetail)
  .get(OrderDetailController.deleteOrderDetail)
  .put(OrderDetailController.updateOrderDetail)

router.route('/bulk')
  .post(OrderDetailController.createOrderDetails)

router.route('/')
  .get(OrderDetailController.getOrderDetails)
  .post(OrderDetailController.createOrderDetail)

module.exports = router
