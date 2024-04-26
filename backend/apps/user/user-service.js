const User = require('./user-model')

const getUsers = async () => {
  return await User.find({}).select('-password')
}

const getUser = async (filter) => {
  return await User.findOne(filter)
}

const createUser = async (user) => {
  const isEmailAlreadyExists = await User.findOne({ email: user.email })
  if (isEmailAlreadyExists) throw new Error('Email already exists')
  const isPhoneAlreadyExists = await User.findOne({ phone: user.phone })
  if (isPhoneAlreadyExists) throw new Error('Phone already exists')
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
