const User = require('./user-address-model')

const getUsers = async () => {
  return await User.find({})
}

const getUser = async (filter) => {
  return await User.findOne(filter)
}

const createUser = async (user) => {
  return await User.create(user)
}

const updateUser = async (filter, user) => {
  return await User.findOneAndUpdate(filter, user)
}

const deleteUser = async (filter) => {
  await User.deleteOne(filter)
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
