const Joi = require('joi')

const createBalanceRequestSchema = Joi.object({
  userId: Joi.string().required(),
  amount: Joi.number().required().min(0)
})

const updateBalanceRequestSchema = Joi.object({
  userId: Joi.string().required(),
  amount: Joi.number().required().min(0)
})

const getBalanceByUserIdRequestSchema = Joi.object({
  userId: Joi.string().required()
})

module.exports = {
  createBalanceRequestSchema,
  updateBalanceRequestSchema,
  getBalanceByUserIdRequestSchema
}
