const Joi = require('joi')

const getUserRequestSchema = Joi.object({
  userId: Joi.string().required()
})

module.exports = {
  getUserRequestSchema
}
