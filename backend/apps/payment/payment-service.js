const UserService = require('../user/user-service')
const AppError = require('../../apps/error/app-error')
const { INTERNAL_ACCOUNT, CASH, BANK_TRANSFER, CREDIT_CARD } = require('../../constant/payment-method')
const OrderService = require('../order/order-service')
const { DEPOSIT, WITHDRAW } = require('../../constant/payment-action')
const updateBalanceForInternalAccount = async (paymentInternalAccountInfo) => {
  const { user_id: userId, amount, action } = paymentInternalAccountInfo
  console.log(paymentInternalAccountInfo)
  const user = await UserService.getUser()
  if (!user) {
    throw new AppError(`Cannot found User with id: ${userId}`, 404)
  }
  let newBalance = null

  const currentBalance = user.balance
  switch (action) {
    case DEPOSIT:
      newBalance = currentBalance + amount
      break
    case WITHDRAW:
      newBalance = currentBalance - amount
      break
    default:
      throw new AppError(`Invalid action ${action}`, 500)
  }
  console.log(newBalance)

  await UserService.updateUser({ _id: userId }, { balance: newBalance })
}

const checkInternalAccountEnoughBalance = async (userId, amountNeedToPurchase) => {
  const user = await UserService.getUser({ _id: userId })
  if (!user) {
    throw new AppError(`Cannot found User with id: ${userId}`, 404)
  }
  const currentBalance = user.balance

  console.log('currentBalance', currentBalance)
  console.log('amount', amountNeedToPurchase)
  if (amountNeedToPurchase > currentBalance) {
    return false
  }
  return true
}

const processPayment = async (orderConfirmInfo) => {
  const {
    order_id: orderId,
    payment_method: paymentMethod
  } = orderConfirmInfo

  const order = await OrderService.getOrder({ _id: orderId })
  if (!order) {
    throw new AppError(`Order not found with id: ${orderId}`, 404)
  }

  switch (paymentMethod) {
    case INTERNAL_ACCOUNT:{
      const userId = order.user_id
      const amount = order.order_total
      const action = 'WITHDRAW'
      const paymentInternalAccountInfo = {
        user_id: userId,
        amount,
        action
      }
      const isInternalAccountEnoughBalance = await checkInternalAccountEnoughBalance()
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
}

module.exports = {
  updateBalanceForInternalAccount,
  checkInternalAccountEnoughBalance,
  processPayment
}
