const express = require('express')
const router = express.Router()
const UserController = require('./../user/user-controller')

router.route('/:id')
  .get(UserController.getUser)

router.route('/:id/recent-orders/')
  .get(UserController.getRecentOrders)

router.route('/')
  .get(UserController.getUsers)

module.exports = router
