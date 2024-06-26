const Joi = require('joi')
const paymentMethods = require('../../../constant/payment-method')
const validateObjectAgainstSchema = require('../../../utils/joi/validation')


const orderConfirmInfoSchema = Joi.object({
  shipping_address: Joi.string().required(),
  payment_info: Joi.object({
    payment_method: Joi.string().valid(
      ...Object.values(paymentMethods)
    ).required()
  })
})

const validate = (object) => {
  return validateObjectAgainstSchema(object, orderConfirmInfoSchema)
}
module.exports = {
  orderConfirmInfoSchema,
  validate
}
