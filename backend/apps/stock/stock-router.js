const express = require('express');
const router = express.Router();
const StockController = require('./stock-controller');
const validateRequest = require('../../utils/joi/validate-request-schema');
const { BODY } = require('../../constant/request-types');
const { createStockRequestSchema } = require('./stock-request-validator');

router.post('/', validateRequest(createStockRequestSchema, [BODY]), StockController.createStock);

module.exports = router;
