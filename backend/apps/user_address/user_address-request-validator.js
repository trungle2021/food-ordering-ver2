const Joi = require('joi')

const createUserAddressRequestSchema = Joi.object({
  userId: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().min(10).max(15).required(),
  recipient: Joi.string().min(2).max(50).required(),
  is_default_address: Joi.boolean().required()
})

const updateUserAddressRequestSchema = Joi.object({
  addressId: Joi.string().required(),
  userId: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().min(10).max(15).required(),
  recipient: Joi.string().min(2).max(50).required(),
  is_default_address: Joi.boolean().required()
})

module.exports = {
  createUserAddressRequestSchema,
  updateUserAddressRequestSchema,
  getUserAddressRequestSchema,
  deleteUserAddressRequestSchema,
  getUserAddressesByUserIDRequestSchema
}
