const Joi = require('joi')
const validateObjectAgainstSchema = require('../../utils/joi/validation')

const loginRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(15).required()
})

const validateLoginRequest = (object) => {
  return validateObjectAgainstSchema(object, loginRequestSchema)
}

module.exports = validateLoginRequest
