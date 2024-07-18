const express = require('express')
const PaymentController = require('./payment-controller')
const router = express.Router()
const validateRequest = require('../../utils/joi/validate-request-schema')
const { topUpRequestSchema } = require('./payment-request-validator')
const { BODY } = require('../../constant/request-types')

router.route('/top-up')
  .post(validateRequest(topUpRequestSchema, [BODY]), PaymentController.topUp)

module.exports = router
