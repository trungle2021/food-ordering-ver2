const UserService = require('../user/user-service')
const AppError = require('../../utils/error/app-error')
const { INTERNAL_ACCOUNT, CASH, BANK_TRANSFER, CREDIT_CARD } = require('../../constant/payment-method')
const { DEPOSIT, WITHDRAW } = require('../../constant/payment-action')

const updateBalanceForInternalAccount = async (paymentInternalAccountInfo) => {
  const { user_id: userId, amount, action } = paymentInternalAccountInfo
  const user = await UserService.getUser()
  if (!user) {
    throw new AppError(`Cannot found User with id: ${userId}`, 404)
  }
  let newBalance = 0

  if (amount <= 0){
    throw new AppError(`Amount must be greater than 0`, 400)
  }

  const currentBalanceParsed = Number.parseFloat(user.balance)
  const amountParsed = Number.parseFloat(amount)
  switch (action) {
    case DEPOSIT:
      newBalance = currentBalanceParsed + amountParsed
      break
    case WITHDRAW:
      if(checkInternalAccountEnoughBalance(currentBalanceParsed, amountParsed)){
        throw new AppError(`Account Balance is not enough`, 402)
      }
      newBalance = currentBalanceParsed - amountParsed
      break
    default:
      throw new AppError(`Invalid action ${action}`, 500)
  }
  console.log("New Balance: " , newBalance)
  const result = await UserService.updateUser({ _id: userId }, { balance: newBalance })
  const currentBalanceUpdated = result.balance
  return currentBalanceUpdated
}

const checkInternalAccountEnoughBalance = async (currentBalance, amountNeedToPurchase) => {
  return amountNeedToPurchase > currentBalance
}

const processPayment = async (order, orderConfirmInfo) => {
  const {
    payment_info: paymentInfo
  } = orderConfirmInfo

  const paymentMethod = paymentInfo.payment_method

  if (!order) {
    throw new AppError('Order is required for payment process', 500)
  }

  switch (paymentMethod) {
    case INTERNAL_ACCOUNT:{
      const userId = order.user
      const amount = order.order_total
      const action = WITHDRAW
      const paymentInternalAccountInfo = {
        user_id: userId,
        amount,
        action
      }
      const isInternalAccountEnoughBalance = await checkInternalAccountEnoughBalance(userId, amount)
      if (!isInternalAccountEnoughBalance) {
        throw new AppError('Account Balance is not enough', 402)
      }
      updateBalanceForInternalAccount(paymentInternalAccountInfo)
      break
    }

    case CASH:
      break
    case BANK_TRANSFER:
      break
    case CREDIT_CARD:
      break
    default:
      throw new AppError('Invalid Payment Method', 500)
  }

  return order
}

module.exports = {
  updateBalanceForInternalAccount,
  checkInternalAccountEnoughBalance,
  processPayment
}
