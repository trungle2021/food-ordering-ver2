const express = require('express')
const router = express.Router()
const BalanceController = require('./balance-controller')

router.route('/')
  .post(BalanceController.createBalance)
  .put(BalanceController.updateBalance)

router.route('/users/:user_id')
  .get(BalanceController.getBalanceByUserId)

module.exports = router