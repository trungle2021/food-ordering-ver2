const UserService = require('../user/user-service')
const AppError = require('../../apps/error/app-error')
const { INTERNAL_ACCOUNT, CASH } = require('../../constant/payment-method')
const { PAID } = require('../../constant/payment-status')
const updateBalanceForInternalAccount = async (paymentInternalAccountInfo) => {
  const userId = paymentInternalAccountInfo.userId
  const amount = paymentInternalAccountInfo.amount

  const user = await UserService.getUser()
  if (!user) {
    throw new AppError(`Cannot found User with id: ${userId}`, 404)
  }

  const currentBalance = user.balance
  const newBalance = currentBalance - amount
  await UserService.updateUser({ _id: userId }, { balance: newBalance })
}

const isAccountEnoughBalance = async (userId, amountNeedToPurchase) => {
  const user = await UserService.getUser({ _id: userId })
  if (!user) {
    throw new AppError(`Cannot found User with id: ${userId}`, 404)
  }
  const currentBalance = user.balance
  if (amountNeedToPurchase > currentBalance) {
    return false
  }
  return true
}

const processPayment = async (orderConfirmInfo) => {
  let paymentStatus = null
  const {
    order_id: orderId,
    payment_method: paymentMethod
  } = orderConfirmInfo

  const isInternalAccountPayment = paymentMethod.toLowerCase() === INTERNAL_ACCOUNT.toLowerCase()

  switch (paymentMethod) {
    case INTERNAL_ACCOUNT:
      const
      break
    case CASH:
      break
    default:
      throw new AppError('Invalid Payment Method', 500)
  }
  if (isInternalAccountPayment) {
    if (!isAccountEnoughBalance()) {
      throw new AppError('Account Balance is not enough', 402)
    }
    updateBalanceForInternalAccount()
    paymentStatus = PAID
  }
}

module.exports = {
  updateBalanceForInternalAccount,
  isAccountEnoughBalance,
  processPayment
}
