const Joi = require('joi')

const createStockRequestSchema = Joi.object({
  dishId: Joi.string().required(),
  quantity: Joi.number().required()
})

module.exports = {
  createStockRequestSchema
}
