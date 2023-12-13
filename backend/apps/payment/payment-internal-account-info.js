const Joi = require('joi')
const validObjectAgainstSchema = require('../../library/Joi/validation')

const paymentInternalAccountInfoSchema = Joi.object({
  user_id: Joi.string().required(),
  amount: Joi.number().required()
})

const validateOrderConfirmInput = (object) => {
  return validObjectAgainstSchema(object, paymentInternalAccountInfoSchema)
}
module.exports = validateOrderConfirmInput
