const Joi = require('joi')

const loginRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(15).required()
})

const registerRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(15).required(),
  phone: Joi.string().min(10).max(15).required(),
  name: Joi.string().min(2).max(50).required(),
  avatar: Joi.string().optional(),
  user_address: Joi.object().optional()
})

const refreshTokenRequestSchema = Joi.object({
  refreshToken: Joi.string().required()
})

module.exports = {
  loginRequestSchema,
  registerRequestSchema,
  refreshTokenRequestSchema
}
