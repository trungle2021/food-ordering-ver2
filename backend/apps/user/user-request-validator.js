const Joi = require('joi');

const getUserRequestSchema = Joi.object({
  userId: Joi.string().required(),
});

const updateUserRequestSchema = Joi.object({
  userId: Joi.string().required(),
}).unknown();

const createAddressRequestSchema = Joi.object({
  userId: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().min(10).max(15).required(),
  recipient: Joi.string().min(2).max(50).required(),
  is_default_address: Joi.boolean().required(),
});

const updateAddressRequestSchema = Joi.object({
  userId: Joi.string().required(),
  addressId: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().min(10).max(15).required(),
  recipient: Joi.string().min(2).max(50).required(),
  is_default_address: Joi.boolean().required(),
});

const getAddressByIdRequestSchema = Joi.object({
  userId: Joi.string().required(),
  addressId: Joi.string().required(),
});

const deleteUserAddressRequestSchema = Joi.object({
  userId: Joi.string().required(),
  addressId: Joi.string().required(),
});

const getAddressListByUserIdRequestSchema = Joi.object({
  userId: Joi.string().required(),
});

module.exports = {
  getUserRequestSchema,
  updateUserRequestSchema,
  createAddressRequestSchema,
  updateAddressRequestSchema,
  getAddressByIdRequestSchema,
  deleteUserAddressRequestSchema,
  getAddressListByUserIdRequestSchema,
};
