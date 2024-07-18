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
  const { userId } = req.params
  const userAddresses = await UserAddressService.getUserAddresses({ user: userId })
  return res.status(200).json({
    status: 'success',
    data: userAddresses
  })
})

const getUserAddress = catchAsyncHandler(async (req, res, next) => {
  const { addressId } = req.params
  const userAddress = await UserAddressService.getUserAddress({ _id: addressId })

  if (!userAddress) {
    console.log('Cannot found address with: ' + addressId)
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

const createUserAddress = catchAsyncHandler(async (req, res, next) => {
  const address = await UserAddressService.createUserAddress(req.body)
  return res.status(200).json({
    status: 'success',
    data: address
  })
})

const updateUserAddress = catchAsyncHandler(async (req, res, next) => {
  const data = {
    ...req.body,
    updated_at: Date.now()
  }

  const updatedAddress = await UserAddressService.updateUserAddress(
    data
  )

  return res.status(200).json({
    status: 'success',
    data: updatedAddress
  })
})

const deleteUserAddress = catchAsyncHandler(async (req, res, next) => {
  // ! Need to validate request body

  const { address_id: addressId } = req.param
  await UserAddressService.deleteUserAddress({ _id: addressId })
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
