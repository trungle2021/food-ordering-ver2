const AppError = require('../error/app-error')
const Cart = require('./cart-model')

const getCarts = async () => {
  return await Cart.find({}).populate({ path: 'category', select: 'name' })
}

const getCart = async (id) => {
  const cart = await Cart.findById(id)
  if (!cart) {
    return null
  }
  return cart
}

const createCarts = async (carts) => {
  return await Cart.insertMany(carts)
}

const createCart = async (cart) => {
  try {
    return await Cart.create(cart)
  } catch (error) {
    throw new AppError(error)
  }
}

const updateCart = async (cart) => {

}

const deleteCart = async (cart) => {

}

module.exports = {
  getCarts,
  getCart,
  createCarts,
  createCart,
  updateCart,
  deleteCart
}
