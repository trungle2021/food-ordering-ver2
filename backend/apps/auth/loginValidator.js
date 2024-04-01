const Joi = require('joi')
const validateObjectAgainstSchema = require('../../library/Joi/validation')

const loginRequestSchema = Joi.object({
  phone: Joi.string().length(15).required(),
  password: Joi.string().min(5).max(15).required()
})

const validateLoginRequest = (object) => {
  return validateObjectAgainstSchema(object, loginRequestSchema)
}

module.exports = validateLoginRequest
