const catchAsync = require('./../utils/catch_async_handler/catch-async-handler')

const UserService = require('./../services/user-service')

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.getAll()
  return res.status(200).json({
    status: 'success',
    data: users
  })
})

const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params.id
  const user = await UserService.findOneById(id)
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: user
  })
})

module.exports = {
  getAllUsers,
  getUserById
}
