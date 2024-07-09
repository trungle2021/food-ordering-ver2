const Joi = require('joi')
const validateObjectAgainstSchema = require('../../utils/joi/validation')

const paymentInternalAccountInfoSchema = Joi.object({
  balance_source: Joi.string().allow('', null).optional(),
  payment_method: Joi.string().allow('', null).optional(),
  amount: Joi.number().required()
})

const validate = (object) => {
  console.log(object)
  return validateObjectAgainstSchema(object, paymentInternalAccountInfoSchema)
}
module.exports = {
  paymentInternalAccountInfoSchema,
  validate
}
