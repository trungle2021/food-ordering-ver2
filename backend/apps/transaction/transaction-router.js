const express = require('express');
const router = express.Router();
const TransactionController = require('./transaction-controller');

router
  .route('/:id')
  .get(TransactionController.getTransaction)
  .put(TransactionController.updateTransaction)
  .delete(TransactionController.deleteTransaction);

router
  .route('/')
  .get(TransactionController.getTransactions)
  .post(TransactionController.createTransaction);

module.exports = router;
