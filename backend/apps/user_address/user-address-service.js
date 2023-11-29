const UserAddress = require('./user-address-model')

const getUserAddresses = async () => {
  return await UserAddress.find({})
}

const getUserAddress = async (filter) => {
  return await UserAddress.findOne(filter)
}

const createUserAddress = async (user) => {
  return await UserAddress.create(user)
}

const updateUserAddress = async (filter, user) => {
  return await UserAddress.findOneAndUpdate(filter, user)
}

const deleteUserAddress = async (filter) => {
  await UserAddress.deleteOne(filter)
}

module.exports = {
  getUserAddresses,
  getUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress
}
