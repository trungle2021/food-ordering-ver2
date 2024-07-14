const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const UserService = require('./user-service')

const getUsers = catchAsyncHandler(async (req, res) => {
  const users = await UserService.getUsers()
  return res.status(200).json({
    status: 'success',
    data: users
  })
})

const getUser = catchAsyncHandler(async (req, res, next) => {
  // ! Need to validate request body

  const { userId } = req.params
  const user = await UserService.getUser({ _id: userId })
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

const updateUser = catchAsyncHandler(async (req, res, next) => {

})

const deleteUser = catchAsyncHandler(async (req, res, next) => {

})

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
