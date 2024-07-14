const Joi = require('joi')

const getCategoryRequestSchema = Joi.object({
  categoryId: Joi.string().required()
})
const deleteCategoryRequestSchema = Joi.object({
  categoryId: Joi.string().required()
})
const updateCategoryRequestSchema = Joi.object({
  categoryId: Joi.string().required(),
  name: Joi.string(),
  image: Joi.string()
})

const createCategoryRequestSchema = Joi.object({
  name: Joi.string().optional(),
  image: Joi.string().optional()
})

module.exports = {
  getCategoryRequestSchema,
  createCategoryRequestSchema,
  updateCategoryRequestSchema,
  deleteCategoryRequestSchema
}
