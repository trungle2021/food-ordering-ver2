const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const UserAddressService = require('./user-address-service')

const getUserAddresses = catchAsyncHandler(async (req, res) => {
  const userAddresses = await UserAddressService.getUserAddresses()
  return res.status(200).json({
    status: 'success',
    data: userAddresses
  })
})

const getUserAddress = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params.id
  const user = await UserAddressService.getUserAddress({ _id: id })
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

const createUserAddress = catchAsyncHandler(async (req, res, next) => {

})

const updateUserAddress = catchAsyncHandler(async (req, res, next) => {

})

const deleteUserAddress = catchAsyncHandler(async (req, res, next) => {

})

module.exports = {
  getUserAddresses,
  getUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress
}
