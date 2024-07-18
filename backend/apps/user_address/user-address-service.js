const mongoose = require('mongoose')
const User = require('../user/user-model')
const UserAddress = require('./user-address-model')
const UserService = require('../user/user-service')

const getUserAddresses = async (filter) => {
  return await UserAddress.find(filter)
  // .populate({ path: 'user', select: 'name -_id' })
}

const getUserAddress = async (filter) => {
  return await UserAddress.findOne(filter).populate({ path: 'user' })
}

const createUserAddress = async (payload) => {
  /*
    if user want to create a new address and set it as default address:
    - check if there is already a default address
    - if there is a default address, set it to false
    - create a new address and set it as default (set is_default_address to true)
    - add the new address to user_address list in the User document
    else if user want to create a new address but not set it as default address:
    - create a new address and set is_default_address to false
    - add the new address to user_address list in the User document
*/

  const { is_default_address: isDefaultAddress, userId } = payload

  // Add the user field to the payload
  // Delete the userId field
  payload.user = userId
  delete payload.userId

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await checkIfUserExists(userId)

    // User want to create a new address and set it as default address
    await handleIfUserWantToChangeDefaultAddress(isDefaultAddress, payload, session)
    // Create a new address in UserAddress
    const result = await UserAddress.create([payload], { session })
    // Step 2: Update the user_address list in the User document
    let newAddress
    if (result.length > 0) {
      newAddress = result[0]
      const addressId = newAddress._id
      await updateUserAddressList(userId, addressId, session)
    }
    // Commit the transaction
    await session.commitTransaction()

    return newAddress
  } catch (error) {
    // If any operation fails, abort the transaction
    await session.abortTransaction()
    console.error('Error creating user address:', error)
    throw error
  } finally {
    session.endSession()
  }
}

const updateUserAddress = async (payload) => {
  const { is_default_address: isDefaultAddress, userId } = payload
  payload.user = userId
  delete payload.userId

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    await checkIfUserExists(userId)

    // Step 1: If user wants to change default address, update existing default address
    await handleIfUserWantToChangeDefaultAddress(isDefaultAddress, payload, session)

    // Step 2: Update the address specified by filter with the new data
    const updatedAddress = await UserAddress.updateOne(userId, payload, {
      new: true,
      upsert: false
    }).session(session)

    // Step 3: If the document was updated, update user_address list in the User document
    const updatedAddressSuccess = updatedAddress.nModified > 0

    if (updatedAddressSuccess) {
      const updatedAddressId = updatedAddress._id
      await updateUserAddressList(userId, updatedAddressId, session)
    }

    // Commit the transaction
    await session.commitTransaction()
    return updatedAddress
  } catch (error) {
    // If any operation fails, abort the transaction
    await session.abortTransaction()
    console.error('Error updating user address:', error)
    throw error
  } finally {
    session.endSession()
  }
}

const checkIfUserExists = async (userId) => {
  const isUserExists = await UserService.checkIfUserExists({ _id: userId })
  if (!isUserExists) {
    throw new Error('User not found', 404)
  }
}

const updateUserAddressList = async (userId, updatedAddressId, session) => {
  await User.findByIdAndUpdate(userId, {
    $addToSet: { user_address: updatedAddressId }
  }).session(session)
}

const handleIfUserWantToChangeDefaultAddress = async (isDefaultAddress, payload, session) => {
  const userWantToChangeDefaultAddress = isDefaultAddress === true
  if (userWantToChangeDefaultAddress) {
    const addressDefault = await UserAddress.findOne({
      is_default_address: true
    }).session(session)

    if (addressDefault) {
      const addressDefaultId = addressDefault._id
      // update existing default address to false
      await UserAddress.findByIdAndUpdate(addressDefaultId, {
        is_default_address: false
      }).session(session)
    } else {
      payload.is_default_address = false
    }
  }
}

const deleteUserAddress = async (filter) => {
  await UserAddress.deleteOne(filter)
}

module.exports = {
  getUserAddresses,
  getUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress
}
