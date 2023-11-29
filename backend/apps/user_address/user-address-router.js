const express = require('express')
const router = express.Router()
const UserAddressController = require('./user-address-controller')

router.route('/:id')
  .get(UserAddressController.getUserAddress)

router.route('/')
  .get(UserAddressController.getUserAddresses)

module.exports = router
