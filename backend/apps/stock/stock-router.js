const express = require('express');
const router = express.Router();
const StockController = require('./stock-controller');
const validateRequest = require('../../utils/joi/validate-request-schema');
const { BODY } = require('../../constant/request-types');
const { upsertStockRequestSchema } = require('./stock-request-validator');

router.post('/', validateRequest(upsertStockRequestSchema, [BODY]), StockController.upsertStock);
router.post('/initialize', StockController.initializeStockForAllDishes);
router.delete('/', StockController.deleteAllStock);
module.exports = router;
