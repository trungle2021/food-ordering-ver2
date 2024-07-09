const express = require('express')
const router = express.Router()
const BalanceController = require('./balance-controller')

router.route('/')
  .get(BalanceController.getBalance)
  .post(BalanceController.createBalance)
  .put(BalanceController.updateBalance)

module.exports = router
