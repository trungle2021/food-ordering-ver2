const Joi = require('joi')
const paymentMethods = require('../../constant/payment-method')

const checkOutOrderRequestSchema = Joi.object({
  userId: Joi.string().required(),
  addressId: Joi.string().required()
})

const cancelOrderRequestSchema = Joi.object({
  orderId: Joi.string().required(),
  reason: Joi.string().required()
})

const confirmOrderRequestSchema = Joi.object({
  orderId: Joi.string().required(),
  payment_info: Joi.object({
    payment_method: Joi.string().valid(
      ...Object.values(paymentMethods)
    ).required()
  })
})

const getRecentOrdersRequestSchema = Joi.object({
  userId: Joi.string().required()
})

const completeOrderRequestSchema = Joi.object({
  orderId: Joi.string().required()
})

const getOrderHistoryRequestSchema = Joi.object({
  userId: Joi.string().required()
})

const getOrderRequestSchema = Joi.object({
  orderId: Joi.string().required()
})

module.exports = {
  checkOutOrderRequestSchema,
  confirmOrderRequestSchema,
  cancelOrderRequestSchema,
  getRecentOrdersRequestSchema,
  completeOrderRequestSchema,
  getOrderHistoryRequestSchema,
  getOrderRequestSchema
}
