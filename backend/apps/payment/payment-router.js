const express = require('express')
const PaymentController = require('./payment-controller')
const router = express.Router()

router.route('/top-up')
  .post(PaymentController.topUp)

module.exports = router
