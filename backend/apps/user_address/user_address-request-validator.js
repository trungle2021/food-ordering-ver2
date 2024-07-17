const Joi = require('joi')

const createUserAddressRequestSchema = Joi.object({
  userId: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().min(10).max(15).required(),
  recipient: Joi.string().min(2).max(50).required()
})

const updateUserAddressRequestSchema = Joi.object({
  userId: Joi.string().required(),
  addressId: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().min(10).max(15).required(),
  recipient: Joi.string().min(2).max(50).required(),
  isDefaultAddress: Joi.boolean().required()
})

const getUserAddressRequestSchema = Joi.object({
  addressId: Joi.string().required()
})

const deleteUserAddressRequestSchema = Joi.object({
  addressId: Joi.string().required()
})

const getUserAddressesByUserIDRequestSchema = Joi.object({
  userId: Joi.string().required()
})

module.exports = {
  createUserAddressRequestSchema,
  updateUserAddressRequestSchema,
  getUserAddressRequestSchema,
  deleteUserAddressRequestSchema,
  getUserAddressesByUserIDRequestSchema
}
