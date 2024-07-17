const express = require('express')
const router = express.Router()
const {
  getUserAddresses,
  createUserAddress,
  updateUserAddress,
  getUserAddress,
  deleteUserAddress,
  getUserAddressesByUserID
} = require('./user-address-controller')
const validateRequest = require('../../utils/joi/validate-request-schema')
const { BODY, PARAMS } = require('../../constant/request-types')
const { createUserAddressRequestSchema, updateUserAddressRequestSchema, getUserAddressRequestSchema, deleteUserAddressRequestSchema, getUserAddressesByUserIDRequestSchema } = require('./user_address-request-validator')

router
  .route('/')
  .get(getUserAddresses)
  .post(validateRequest(createUserAddressRequestSchema, BODY), createUserAddress)
  .put(validateRequest(updateUserAddressRequestSchema, BODY), updateUserAddress)

router
  .route('/:addressId')
  .get(validateRequest(getUserAddressRequestSchema, PARAMS), getUserAddress)
  .delete(validateRequest(deleteUserAddressRequestSchema, PARAMS), deleteUserAddress)

router.route('/users/:userId').get(validateRequest(getUserAddressesByUserIDRequestSchema, PARAMS), getUserAddressesByUserID)

module.exports = router
