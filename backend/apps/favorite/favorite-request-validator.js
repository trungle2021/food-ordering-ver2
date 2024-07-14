const Joi = require('joi')

const deleteFavoriteRequestSchema = Joi.object({
  favoriteId: Joi.string().required()
})

const getFavoriteByUserIdRequestSchema = Joi.object({
  userId: Joi.string().required()
})

const createFavoriteRequestSchema = Joi.object({
  userId: Joi.string().required(),
  dishId: Joi.string().required()
})

module.exports = {
  deleteFavoriteRequestSchema,
  getFavoriteByUserIdRequestSchema,
  createFavoriteRequestSchema
}
