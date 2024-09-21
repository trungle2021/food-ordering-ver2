const AppError = require('../../utils/error/app-error');
const {
  INTERNAL_ACCOUNT,
  CASH,
  BANK_TRANSFER,
  CREDIT_CARD,
} = require('../../constant/payment-method');
const { DEPOSIT, WITHDRAW } = require('../../constant/payment-action');
const BalanceService = require('../balance/balance-service');
const logger = require('../../utils/logging/winston');

const updateBalanceForInternalAccount = async (payload) => {
  const { userId, amount, paymentAction } = payload;

  const balance = await BalanceService.getBalance({ user: userId });
  if (!balance) {
    logger.error(`Fail to fetch balance with userid: ${userId}`);
    throw new AppError('Fail to fetch balance', 404);
  }
  let newBalance = 0;

  if (amount <= 0) {
    throw new AppError('Amount must be greater than 0', 400);
  }

  const currentBalanceParsed = Number.parseFloat(balance.amount);
  const amountParsed = Number.parseFloat(amount);
  switch (paymentAction) {
    case DEPOSIT:
      // Assuming the money has been deducted from the external account.
      newBalance = currentBalanceParsed + amountParsed;
      break;
    case WITHDRAW:
      if (internalAccountIsEnoughBalance(currentBalanceParsed, amountParsed)) {
        throw new AppError('Account Balance is not enough', 402);
      }
      newBalance = currentBalanceParsed - amountParsed;
      break;
    default:
      throw new AppError(`Invalid action: ${paymentAction}`, 500);
  }
  console.log('New Balance: ', newBalance);
  const result = await BalanceService.updateBalance({ user: userId }, { amount: newBalance });
  const currentBalanceUpdated = result.amount;
  return currentBalanceUpdated;
};

const internalAccountIsEnoughBalance = async (currentBalance, purchaseAmount) => {
  return purchaseAmount > currentBalance;
};

const processPayment = async (order, orderConfirmInfo) => {
  const { paymentInfo } = orderConfirmInfo;

  const paymentMethod = paymentInfo.paymentMethod;

  if (!order) {
    throw new AppError('Order is required for payment process', 500);
  }

  switch (paymentMethod) {
    case INTERNAL_ACCOUNT: {
      const userId = order.user;
      const amount = order.order_total;
      const action = WITHDRAW;
      const paymentInternalAccountInfo = {
        userId,
        amount,
        action,
      };
      const isInternalAccountEnoughBalance = await internalAccountIsEnoughBalance(userId, amount);
      if (!isInternalAccountEnoughBalance) {
        throw new AppError('Account Balance is not enough', 402);
      }
      updateBalanceForInternalAccount(paymentInternalAccountInfo);
      break;
    }

    case CASH:
      break;
    case BANK_TRANSFER:
      break;
    case CREDIT_CARD:
      break;
    default:
      throw new AppError('Invalid Payment Method', 500);
  }

  return order;
};

module.exports = {
  updateBalanceForInternalAccount,
  internalAccountIsEnoughBalance,
  processPayment,
};
