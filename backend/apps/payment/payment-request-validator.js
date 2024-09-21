const Joi = require('joi');

const topUpRequestSchema = Joi.object({
  userId: Joi.string().required(),
  paymentMethodId: Joi.string().allow('', null).optional(),
  paymentMethod: Joi.string().allow('', null).optional(),
  source: Joi.string().allow('', null).optional(),
  amount: Joi.number().required(),
});

module.exports = {
  topUpRequestSchema,
};
