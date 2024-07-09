const UserAddress = require('./user-address-model')

const getUserAddresses = async (filter) => {
  return await UserAddress.find(filter)
  // .populate({ path: 'user', select: 'name -_id' })
}

const getUserAddress = async (filter) => {
  return await UserAddress.findOne(filter).populate({ path: 'user' })
}

const createUserAddress = async (data) => {
  return await UserAddress.create(data)
}

const updateUserAddress = async (filter, data, option) => {
  const { user } = data
  // Find and update the document(s) with is_default_address: true and matching user
  await UserAddress.updateOne({ is_default_address: true, user }, { is_default_address: false })
  // Update the document(s) that match the filter with the provided data and options
  return await UserAddress.updateOne(filter, data, option)
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
