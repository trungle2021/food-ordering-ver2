const Joi = require('joi')
const validateObjectAgainstSchema = require('../../utils/joi/validation')

const paymentInternalAccountInfoSchema = Joi.object({
  amount: Joi.number().required(),
})

const validate = (object) => {
  console.log(object)
  return validateObjectAgainstSchema(object, paymentInternalAccountInfoSchema)
}
module.exports = {
  paymentInternalAccountInfoSchema,
  validate
}
