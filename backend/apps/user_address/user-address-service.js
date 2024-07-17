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
  const { userId: user } = payload
  const isUserExists = UserService.checkIfUserExists({ _id: user })
  if (!isUserExists) {
    throw new Error('User not found', 404)
  }
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Step 1: Create a new address in UserAddress
    const result = await UserAddress.create([payload], { session })
    const newAddress = result[0]
    console.log('newAddress', newAddress)
    // Step 2: Update the user_address list in the User document
    const updatedUser = await User.findByIdAndUpdate(
      user,
      {
        $addToSet: { user_address: newAddress._id }
      },
      { session }
    )

    // Commit the transaction
    await session.commitTransaction()
    session.endSession()
    console.log('updatedUser', updatedUser)

    return newAddress
  } catch (error) {
    // If any operation fails, abort the transaction
    await session.abortTransaction()
    session.endSession()

    console.error('Error creating user address:', error)
    throw error
  }
}

const updateUserAddress = async (filter, payload) => {
  const { isDefaultAddress, userId } = payload
  const isUserExists = UserService.checkIfUserExists({ _id: userId })
  if (!isUserExists) {
    throw new Error('User not found', 404)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    // Step 1: If user wants to change default address, update existing default address
    if (isDefaultAddress) {
      const addressDefault = await UserAddress.findOne({
        is_default_address: true
      }).session(session)
      const isAddressDefaultExists = addressDefault !== undefined
      if (isAddressDefaultExists) {
        await UserAddress.findByIdAndUpdate(addressDefault._id, {
          is_default_address: false
        }).session(session)
      }
    }

    // Step 2: Update the address specified by filter with the new data
    const updatedAddress = await UserAddress.updateOne(filter, payload, {
      new: true,
      upsert: false
    }).session(session)

    // Step 3: If the document was updated, update user_address list in the User document
    const updatedAddressSuccess = updatedAddress.nModified > 0
    const updateUserAddressList = async () => {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { user_address: updatedAddress._id }
      }).session(session)
    }

    if (updatedAddressSuccess) {
      updateUserAddressList()
    }

    // Commit the transaction
    await session.commitTransaction()
    session.endSession()

    return updatedAddress
  } catch (error) {
    // If any operation fails, abort the transaction
    await session.abortTransaction()
    session.endSession()
    console.error('Error updating user address:', error)
    throw error
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
