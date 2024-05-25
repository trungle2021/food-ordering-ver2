const express = require('express')
const router = express.Router()
const StockController = require('./stock-controller')

router.post('/', StockController.createStock)

module.exports = router
