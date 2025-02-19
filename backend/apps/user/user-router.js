const express = require('express');
const router = express.Router();
const {
  getUser,
  updateUser,
  getAddressList,
  getAddressById,
  createAddress,
  updateAddress,
  getUsers,
  deleteAllUsers
} = require('./../user/user-controller');
const validateRequest = require('../../utils/joi/validate-request-schema');
const { PARAMS, BODY } = require('../../constant/request-types');
const {
  getUserRequestSchema,
  updateUserRequestSchema,
  getAddressByIdRequestSchema,
  getAddressListByUserIdRequestSchema,
  updateAddressRequestSchema,
  createAddressRequestSchema,
} = require('./user-request-validator');

router
  .route('/:userId')
  .get(validateRequest(getUserRequestSchema, [PARAMS]), getUser)
  .put(validateRequest(updateUserRequestSchema, [PARAMS, BODY]), updateUser);

router
  .route('/:userId/addresses')
  .post(validateRequest(createAddressRequestSchema, [PARAMS, BODY]), createAddress)
  .put(validateRequest(updateAddressRequestSchema, [PARAMS, BODY]), updateAddress)
  .get(validateRequest(getAddressListByUserIdRequestSchema, [PARAMS]), getAddressList);

router
  .route('/:userId/addresses/:addressId')
  .get(validateRequest(getAddressByIdRequestSchema, [PARAMS]), getAddressById);

router.route('/delete-all-users')
  .delete(deleteAllUsers);

router.route('/')
  .get(getUsers);


module.exports = router;
