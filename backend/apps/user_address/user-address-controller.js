const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const UserAddressService = require('./user-address-service')

const getUserAddresses = catchAsyncHandler(async (req, res) => {
  const userAddresses = await UserAddressService.getUserAddresses({})
  return res.status(200).json({
    status: 'success',
    data: userAddresses
  })
})

const getUserAddressesByUserID = catchAsyncHandler(async (req, res) => {
  const { id } = req.params
  const userAddresses = await UserAddressService.getUserAddresses({ user: id })
  return res.status(200).json({
    status: 'success',
    data: userAddresses
  })
})

const getUserAddress = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params
  const userAddress = await UserAddressService.getUserAddress({ _id: id })

  if (!userAddress) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cannot found address with ' + id
    })
  }
  return res.status(200).json({
    status: 'success',
    data: userAddress
  })
})

const createUserAddress = catchAsyncHandler(async (req, res, next) => {
  const payload = req.body
  payload.is_default_address = false

  const address = await UserAddressService.createUserAddress(payload)
  return res.status(200).json({
    status: 'success',
    data: address
  })
})

const updateUserAddress = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params
  const payload = req.body

  const filter = { _id: id }
  const data = {
    ...payload,
    updated_at: Date.now()
  }
  const option = { new: true }

  const updatedAddress = await UserAddressService.updateUserAddress(filter, data, option)

  return res.status(200).json({
    status: 'success',
    data: updatedAddress
  })
})

const deleteUserAddress = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.param
  await UserAddressService.deleteUserAddress({ _id: id })
  return res.status(200).json({
    status: 'success',
    message: 'Delete User Address Successfully'
  })
})

module.exports = {
  getUserAddresses,
  getUserAddressesByUserID,
  getUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress
}
