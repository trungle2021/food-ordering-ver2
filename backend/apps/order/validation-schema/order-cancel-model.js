const Joi = require('joi')
const validateObjectAgainstSchema = require('../../../utils/joi/validation')

const orderCancelSchema = Joi.object({
  reason: Joi.string().optional('')
})

const validate = (object) => {
  return validateObjectAgainstSchema(object, orderCancelSchema)
}

module.exports = {
  orderCancelSchema,
  validate
}
