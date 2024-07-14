const express = require('express')
const router = express.Router()
const {
  getRecentOrders,
  confirmOrder,
  completeOrder,
  cancelOrder,
  getOrderHistory,
  getOrder,
  getOrders,
  checkoutOrder,
  deleteAll
} = require('../order/order-controller')
// const validateRequest = require('../../utils/joi/validate-request-schema')

router.route('/recent-orders/users/:userId')
  .get(getRecentOrders)

router.route('/confirm')
  .post(confirmOrder)

router.route('/complete')
  .post(completeOrder)

router.route('/cancel')
  .post(cancelOrder)

router.route('/check-out')
  .post(checkoutOrder)

router.route('/history/users/:userId')
  .get(getOrderHistory)

router.route('/:orderId')
  .get(getOrder)

router.route('/')
  .get(getOrders)
  .delete(deleteAll)

module.exports = router
