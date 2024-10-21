const Joi = require('joi');

const upsertStockRequestSchema = Joi.object({
  dishId: Joi.string().required(),
  quantity: Joi.number().required(),
});

module.exports = {
  upsertStockRequestSchema,
};
