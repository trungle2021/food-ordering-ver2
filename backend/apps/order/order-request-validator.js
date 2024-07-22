const Joi = require('joi')
const paymentMethods = require('../../constant/payment-method')

// const createOrderRequestSchema = Joi.object({
//   userId: Joi.string().required(),
//   addressId: Joi.string().required()
// })

const cancelOrderRequestSchema = Joi.object({
  orderId: Joi.string().required(),
  reason: Joi.string().required()
})

const confirmOrderRequestSchema = Joi.object({
  orderId: Joi.string().required(),
  paymentInfo: Joi.object({
    paymentMethod: Joi.string().valid(
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
//   createOrderRequestSchema,
  confirmOrderRequestSchema,
  cancelOrderRequestSchema,
  getRecentOrdersRequestSchema,
  completeOrderRequestSchema,
  getOrderHistoryRequestSchema,
  getOrderRequestSchema
}
