const Joi = require('joi');
const paymentMethods = require('../../constant/payment-method');

const cancelOrderRequestSchema = Joi.object({
  orderId: Joi.string().required(),
  cancelReasonId: Joi.string().required(),
});

const confirmOrderRequestSchema = Joi.object({
  orderId: Joi.string().required(),
  paymentInfo: Joi.object({
    paymentMethod: Joi.string()
      .valid(...Object.values(paymentMethods))
      .required(),
  }),
});

const getRecentOrdersRequestSchema = Joi.object({
  userId: Joi.string().required(),
});

const completeOrderRequestSchema = Joi.object({
  orderId: Joi.string().required(),
});

const getOrderHistoryRequestSchema = Joi.object({
  userId: Joi.string().required(),
  page: Joi.number().integer(),
  limit: Joi.number().integer(),
  order_date: Joi.date(),
  dish_name: Joi.string(),
});

const getOrderRequestSchema = Joi.object({
  orderId: Joi.string().required(),
});

const updateOrderRequestSchema = Joi.object({
  orderId: Joi.string().required(),

  addressId: Joi.string().required().optional(),
});

const getCheckoutSessionRequestSchema = Joi.object({
  sessionId: Joi.string().required(),
});

const updateCheckoutSessionRequestSchema = Joi.object({
  sessionId: Joi.string().required(),
  addressId: Joi.string().required().optional(),
});

module.exports = {
  updateOrderRequestSchema,
  confirmOrderRequestSchema,
  cancelOrderRequestSchema,
  getRecentOrdersRequestSchema,
  completeOrderRequestSchema,
  getOrderHistoryRequestSchema,
  getOrderRequestSchema,
  getCheckoutSessionRequestSchema,
  updateCheckoutSessionRequestSchema,
};
