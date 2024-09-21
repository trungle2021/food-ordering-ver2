const Joi = require('joi');
const validateObjectAgainstSchema = require('../../utils/joi/validation');

const registerRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(15).required(),
  name: Joi.string(),
  phone: Joi.string(),
});

const validateLoginRequest = (object) => {
  return validateObjectAgainstSchema(object, registerRequestSchema);
};

module.exports = validateLoginRequest;
