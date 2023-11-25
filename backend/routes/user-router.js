const express = require('express')
const router = express.Router()
const UserController = require('./../controllers/user-controller')

router.route('/:id')
  .get(UserController.getUserById)

router.route('/')
  .get(UserController.getAllUsers)

module.exports = router
