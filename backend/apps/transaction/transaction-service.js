const Transaction = require('./transaction-model')

const getTransactions = async (filter) => {
  return await Transaction.find(filter)
}

const getTransaction = async () => {

}

const createTransaction = async (transaction) => {

}

const updateTransaction = async (id, newTransaction) => {

}

const deleteTransaction = async (id) => {

}

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
}
