const Joi = require('joi')
const paymentMethods = require('../../constant/payment-method')
const validateObjectAgainstSchema = require('../../library/Joi/validation')

const orderConfirmInfoSchema = Joi.object({
  user_id: Joi.string().required(),
  order_id: Joi.string().required(),
  payment_info: Joi.object({
    payment_method: Joi.string().valid(
      ...paymentMethods
    ).required()
  })
})

const validateOrderConfirmInput = (object) => {
  return validateObjectAgainstSchema(object, orderConfirmInfoSchema)
}
module.exports = validateOrderConfirmInput
