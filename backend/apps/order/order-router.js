const express = require('express');
const router = express.Router();
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
  updateOrder,
  getCheckoutSession,
} = require('../order/order-controller');
const validateRequest = require('../../utils/joi/validate-request-schema');
const {
  updateOrderRequestSchema,
  cancelOrderRequestSchema,
  confirmOrderRequestSchema,
  getRecentOrdersRequestSchema,
  completeOrderRequestSchema,
  getOrderHistoryRequestSchema,
  getOrderRequestSchema,
  getCheckoutSessionRequestSchema,
} = require('./order-request-validator');
const { BODY, PARAMS, QUERY } = require('../../constant/request-types');

router
  .route('/recent-orders/users/:userId')
  .get(validateRequest(getRecentOrdersRequestSchema, [PARAMS]), getRecentOrders);

router.route('/confirm').post(validateRequest(confirmOrderRequestSchema, [BODY]), confirmOrder);

router.route('/complete').post(validateRequest(completeOrderRequestSchema, [BODY]), completeOrder);

router.route('/cancel').post(validateRequest(cancelOrderRequestSchema, [BODY]), cancelOrder);

router.route('/checkout').post(checkOut);

router.route('/checkout-session/:sessionId').get(validateRequest(getCheckoutSessionRequestSchema, [PARAMS]), getCheckoutSession);
router
  .route('/history/users/:userId')
  .get(validateRequest(getOrderHistoryRequestSchema, [PARAMS, QUERY]), getOrderHistory);

router
  .route('/:orderId')
  .get(validateRequest(getOrderRequestSchema, [PARAMS]), getOrder)
  .put(validateRequest(updateOrderRequestSchema, [PARAMS, BODY]), updateOrder);

router.route('/').get(getOrders).delete(deleteAll);

module.exports = router;
