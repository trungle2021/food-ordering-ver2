const express = require('express')
const router = express.Router()
const UserController = require('./user-address-controller')

router.route('/:id')
  .get(UserController.getUser)

router.route('/')
  .get(UserController.getUsers)

module.exports = router
