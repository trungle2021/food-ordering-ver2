const express = require('express')
const router = express.Router()
const UserController = require('./../user/user-controller')
const validateRequest = require('../../utils/joi/validate-request-schema')
const { PARAMS } = require('../../constant/request-types')
const { getUserRequestSchema } = require('./user-request-validator')

router.route('/:userId')
  .get(validateRequest(getUserRequestSchema, [PARAMS]), UserController.getUser)

router.route('/')
  .get(UserController.getUsers)

module.exports = router
