const AppError = require('../../utils/error/app-error')
const User = require('./user-model')

const getUsers = async () => {
  return await User.find({}).select('-password')
}

const getUser = async (filter) => {
  return await User.findOne(filter).populate({
    path: 'user_address',
    match: {
      is_default_address: true
    },
    select: {
      _id: 1,
      is_default_address: 1,
      address: 1
    }
  }).select('-password')
}

const checkIfUserExists = async (userId) => {
  const count = await User.countDocuments({ _id: userId })
  return count > 0
}

const createUser = async (user) => {
  const isEmailAlreadyExists = await User.findOne({ email: user.email })
  if (isEmailAlreadyExists) throw new AppError('Email already exists', 409)
  const isPhoneAlreadyExists = await User.findOne({ phone: user.phone })
  if (isPhoneAlreadyExists) throw new AppError('Phone already exists', 409)
  return await User.create(user)
}

const updateUser = async (userId, payload) => {
//   if (payload.user_address) {
//     //* ignore user_address field
//     //* update will be handled by updateAddress
//     delete payload.user_address
//   }
  return await User.findByIdAndUpdate(userId, payload, { upsert: false, returnDocument: 'after' })
}

const deleteUser = async (filter) => {
  await User.deleteOne(filter)
}

const getAddressList = async (userId) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new AppError('User not found', 404)
  }
  return user.user_address
}

const getAddressById = async (userId, addressId) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new AppError('User not found', 404)
  }
  const address = user.user_address.id(addressId)
  if (!address) {
    throw new AppError('Address not found', 404)
  }
  return address
}

const createAddress = async (userId, payload) => {
  /*
        if user want to create a new address and set it as default address:
        - check if there is already a default address
        - if there is a default address, change is_default_address to false
        - create a new address and set it as default (set is_default_address to true)
        - add the new address to user_address list in the User document
        else if user want to create a new address but not set it as default address:
        - create a new address and set is_default_address to false
        - add the new address to user_address list in the User document
    */
  const { is_default_address: isDefaultAddress } = payload
  // Add the user field to the payload
  // Delete the userId field
  const user = await User.findById(userId)
  if (!user) {
    throw new AppError('User not found', 404)
  }
  if (user.user_address.length === 0) {
    payload.is_default_address = true
  } else {
  // User want to create a new address and set it as default address
    await handleIfUserWantToChangeDefaultAddress(user, isDefaultAddress)
  }
  // Create a new address in UserAddress
  const newAddress = { ...payload }
  // Update the user_address list in the User document
  user.user_address.push(newAddress)
  await user.save()
  return user
}

const handleIfUserWantToChangeDefaultAddress = async (user, isDefaultAddress) => {
  const userWantToChangeDefaultAddress = isDefaultAddress === true
  if (userWantToChangeDefaultAddress) {
    // Check if there is already a default address
    const addressDefault = user.user_address.find(address => address.is_default_address === true)
    if (addressDefault) {
      // update existing default address to false
      addressDefault.is_default_address = false
    }
  }
}
const updateAddress = async (userId, payload) => {
  const { is_default_address: isDefaultAddress } = payload

  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }
    // Step 1: If user wants to change default address, update existing default address
    await handleIfUserWantToChangeDefaultAddress(user, isDefaultAddress)

    // Step 2: Update the address specified by filter with the new data
    if (user.user_address) {
      const address = user.user_address.id(payload.addressId)
      if (address) {
        address.set(payload)
      } else {
        throw new AppError('Address not found', 404)
      }
    } else {
      throw new AppError('Set address default failed', 404)
    }

    await user.save()
    return user
  } catch (error) {
    // If any operation fails, abort the transaction
    console.error('Error updating user address:', error)
    throw error
  }
}

const deleteAddress = async (userId, addressId) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new AppError('User not found', 404)
  }
  user.user_address.id(addressId).remove()
  await user.save()
  return user
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkIfUserExists,
  getAddressList,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
}
