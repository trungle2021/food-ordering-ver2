const express = require('express')
const router = express.Router()
const { BODY, PARAMS } = require('../../constant/request-types')
const validateRequest = require('../../utils/joi/validate-request-schema')
const { createBalanceRequestSchema, updateBalanceRequestSchema, getBalanceByUserIdRequestSchema } = require('./balance-request-validator')
const { createBalance, updateBalance, getBalanceByUserId } = require('./balance-controller')

router.route('/')
  .post(validateRequest(createBalanceRequestSchema, BODY), createBalance)
  .put(validateRequest(updateBalanceRequestSchema, BODY), updateBalance)

router.route('/users/:userId?')
  .get(validateRequest(getBalanceByUserIdRequestSchema, PARAMS), getBalanceByUserId)

module.exports = router
