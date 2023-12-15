const Joi = require('joi')
const validObjectAgainstSchema = require('../../library/Joi/validation')
const paymentActions = require('../../constant/payment-action')

const paymentInternalAccountInfoSchema = Joi.object({
  user_id: Joi.string().required(),
  amount: Joi.number().required(),
  action: Joi.string().valid(...paymentActions).required()
})

const validate = (object) => {
  return validObjectAgainstSchema(object, paymentInternalAccountInfoSchema)
}
module.exports = {
  paymentInternalAccountInfoSchema,
  validate
}
