const AppError = require('../utils/error_handler/app-error')
const User = require('./../models/user-model')
const catchAsync = require('./../utils/catch_async_handler/catch-async-handler')

const getAll = catchAsync(async () => {
  return await User.find({})
})

const findOneById = async (id) => {
  const user = await User.findById(id)
  if (!user) {
    return null
  }
  return user
}

const create = async (user) => {
  try {
    return await User.create(user)
  } catch (error) {
    throw new AppError(error)
  }
}

module.exports = {
  getAll,
  findOneById,
  create
}
