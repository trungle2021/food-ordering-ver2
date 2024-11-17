const Balance = require('../balance/balance-model');

const getBalances = async () => {
  return await Balance.find();
};

const getBalance = async (filter) => {
  const balance = await Balance.find(filter);
  return balance[0];
};

const createBalance = async ({ user, amount = 0 }) => {
  return await Balance.create({ user, amount });
};

const updateBalance = async (filter, data) => {
  const { amount } = data;
  if (amount < 0) {
    throw new Error('Amount must be greater than 0');
  }
  const result = await Balance.findOneAndUpdate(filter, data, { returnDocument: 'after' });
  return result;
};

const deleteAllBalances = async () => {
  await Balance.deleteMany({});
};

module.exports = {
  getBalances,
  getBalance,
  createBalance,
  updateBalance,
  deleteAllBalances,
};
