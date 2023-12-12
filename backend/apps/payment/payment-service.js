const UserService = require('../user/user-service')
const AppError = require('../../apps/error/app-error')

const updateBalanceForInternalAccount = async (payment) => {
  const userId = payment.userId
  const amount = payment.amount

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

module.exports = {
  updateBalanceForInternalAccount,
  isAccountEnoughBalance
}
