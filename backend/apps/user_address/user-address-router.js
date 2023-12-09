const express = require('express')
const router = express.Router()
const UserAddressController = require('./user-address-controller')

router.route('/:id')
  .get(UserAddressController.getUserAddress)
  .put(UserAddressController.updateUserAddress)
  .delete(UserAddressController.deleteUserAddress)

router.route('/users/:id')
  .get(UserAddressController.getUserAddressesByUserID)

router.route('/')
  .get(UserAddressController.getUserAddresses)
  .post(UserAddressController.createUserAddress)

module.exports = router
