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
  const { userId } = req.params
  const updatedUser = await UserService.updateUser(userId, req.body)
  return res.status(200).json({
    status: 'success',
    data: updatedUser
  })
})

const deleteUser = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params
  await UserService.deleteUser({ _id: userId })
  return res.status(200).json({
    status: 'success',
    message: 'Delete User Successfully'
  })
})

const getAddressList = catchAsyncHandler(async (req, res) => {
  const { userId } = req.params
  const userAddresses = await UserService.getAddressList(userId)
  return res.status(200).json({
    status: 'success',
    data: userAddresses
  })
})

const getAddressById = catchAsyncHandler(async (req, res, next) => {
  const { userId, addressId } = req.params
  const userAddress = await UserService.getAddressById(userId, addressId)

  if (!userAddress) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cannot found address'
    })
  }
  return res.status(200).json({
    status: 'success',
    data: userAddress
  })
})

const createAddress = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const address = await UserService.createAddress(userId, req.body)
  return res.status(200).json({
    status: 'success',
    data: address
  })
})

const updateAddress = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const payload = {
    ...req.body,
    updated_at: Date.now()
  }

  const user = await UserService.updateAddress(userId, payload)
  return res.status(200).json({
    status: 'success',
    data: user
  })
})

const deleteAddress = catchAsyncHandler(async (req, res, next) => {
  const { userId, addressId } = req.param
  await UserService.deleteAddress(userId, addressId)
  return res.status(200).json({
    status: 'success',
    message: 'Delete User Address Successfully'
  })
})

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAddressList,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
}
