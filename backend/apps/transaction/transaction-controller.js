const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler');

const getTransactions = catchAsyncHandler(async (req, res, next) => {});

const getTransaction = catchAsyncHandler(async (req, res, next) => {});

const createTransaction = catchAsyncHandler(async (req, res, next) => {});

const updateTransaction = catchAsyncHandler(async (req, res, next) => {});

const deleteTransaction = catchAsyncHandler(async (req, res, next) => {});

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
