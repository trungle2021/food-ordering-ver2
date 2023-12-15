const express = require('express')
const PaymentController = require('./payment-controller')
const router = express.Router()

router.route('/topup/:id')
  .post(PaymentController.topUp)

module.exports = router
