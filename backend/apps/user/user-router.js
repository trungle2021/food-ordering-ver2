const express = require('express')
const router = express.Router()
const UserController = require('./../user/user-controller')

router.route('/:user_id')
  .get(UserController.getUser)

router.route('/')
  .get(UserController.getUsers)

module.exports = router
