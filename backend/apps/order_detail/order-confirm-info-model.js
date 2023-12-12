const Joi = require('joi')
const paymentMethods = require('../../constant/payment-method')

const orderConfirmInfoSchema = Joi.object({
  user_id: Joi.string().required(),
  order_id: Joi.string().required(),
  payment_info: Joi.object({
    payment_method: Joi.string().valid(
      ...paymentMethods
    ).required()
  })
})

const validateOrderConfirmInput = (data) => {
  const { error } = orderConfirmInfoSchema.validate(data, { abortEarly: false })
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message)
    return {
      data,
      result: false,
      count: error.details.length,
      errors: errorMessages
    }
  }
  return {
    result: true,
    data
  }
}
module.exports = validateOrderConfirmInput
