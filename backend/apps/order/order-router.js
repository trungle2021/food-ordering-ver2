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
  checkOut,
  deleteAll,
  updateOrder
} = require('../order/order-controller')
const validateRequest = require('../../utils/joi/validate-request-schema')
const { cancelOrderRequestSchema, confirmOrderRequestSchema, getRecentOrdersRequestSchema, completeOrderRequestSchema, getOrderHistoryRequestSchema, getOrderRequestSchema } = require('./order-request-validator')
const { BODY, PARAMS } = require('../../constant/request-types')

router.route('/recent-orders/users/:userId')
  .get(validateRequest(getRecentOrdersRequestSchema, [PARAMS]), getRecentOrders)

router.route('/confirm')
  .post(validateRequest(confirmOrderRequestSchema, [BODY]), confirmOrder)

router.route('/complete')
  .post(validateRequest(completeOrderRequestSchema, [BODY]), completeOrder)

router.route('/cancel')
  .post(validateRequest(cancelOrderRequestSchema, [BODY]), cancelOrder)

router.route('/check-out')
  .post(checkOut)

router.route('/history/users/:userId')
  .get(validateRequest(getOrderHistoryRequestSchema, [PARAMS]), getOrderHistory)

router.route('/:orderId')
  .get(validateRequest(getOrderRequestSchema, [PARAMS]), getOrder)

router.route('/')
  .get(getOrders)
  .put(updateOrder)
  .delete(deleteAll)

module.exports = router
