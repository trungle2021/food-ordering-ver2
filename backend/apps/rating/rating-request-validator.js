const addRatingRequestSchema = Joi.object({
    dishId: Joi.string().required(),
    ratingPoint: Joi.number().required()
  })

module.exports = {
    addRatingRequestSchema
}