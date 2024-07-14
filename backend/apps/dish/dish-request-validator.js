const Joi = require('joi')

const searchDishesByFullTextSearchRequestSchema = Joi.object({
  keyword: Joi.string().required(),
  limit: Joi.number().integer()
})
const getDishRequestSchema = Joi.object({
  dishId: Joi.string().required()
})
const deleteDishRequestSchema = Joi.object({
  dishId: Joi.string().required()
})
const updateDishRequestSchema = Joi.object({
  dishId: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.string().required()
})
const createDishRequestSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.string().required()
})

module.exports = {
  searchDishesByFullTextSearchRequestSchema,
  getDishRequestSchema,
  deleteDishRequestSchema,
  updateDishRequestSchema,
  createDishRequestSchema
}
