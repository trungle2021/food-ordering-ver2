const express = require('express')
const router = express.Router()
const UserAddressController = require('./user-address-controller')

router
  .route('/')
  .get(UserAddressController.getUserAddresses)
  .post(UserAddressController.createUserAddress)
  .put(UserAddressController.updateUserAddress)

router
  .route('/:addressId')
  .get(UserAddressController.getUserAddress)
  .delete(UserAddressController.deleteUserAddress)

router.route('/users/:userId').get(UserAddressController.getUserAddressesByUserID)

module.exports = router
