const Joi = require('joi')
const validateObjectAgainstSchema = require('../../../library/Joi/validation')

const orderCancelSchema = Joi.object({
  order_id: Joi.string().required(),
  reason: Joi.string().optional('')
})

const validate = (object) => {
  return validateObjectAgainstSchema(object, orderCancelSchema)
}

module.exports = {
  orderCancelSchema,
  validate
}
