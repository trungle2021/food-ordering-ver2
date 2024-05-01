const Joi = require('joi')
const paymentActions = require('../../constant/payment-action')
const validateObjectAgainstSchema = require('../../utils/joi/validation')

const paymentInternalAccountInfoSchema = Joi.object({
  user_id: Joi.string().required(),
  amount: Joi.number().required(),
  action: Joi.string().valid(...Object.values(paymentActions)).required()
})

const validate = (object) => {
  return validateObjectAgainstSchema(object, paymentInternalAccountInfoSchema)
}
module.exports = {
  paymentInternalAccountInfoSchema,
  validate
}
