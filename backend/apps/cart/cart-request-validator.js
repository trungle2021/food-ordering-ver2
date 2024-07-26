const Joi = require('joi')

const getCartByUserIdSchemaValidator = Joi.object({
  userId: Joi.string().required()
})
const addItemSchemaValidator = Joi.object({
  dishId: Joi.string().required(),
  quantity: Joi.number().required()
})
const updateItemSchemaValidator = Joi.object({
  dishId: Joi.string().required(),
  updateQuantity: Joi.number().required()
})
const removeItemSchemaValidator = Joi.object({
  userId: Joi.string().required(),
  dishId: Joi.string().required()
})

const CartRequestValidator = {
  getCartByUserIdSchemaValidator,
  addItemSchemaValidator,
  updateItemSchemaValidator,
  removeItemSchemaValidator
}

module.exports = CartRequestValidator
