const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const CartService = require('./cart-service')

const getCarts = catchAsyncHandler(async (req, res) => {
  const carts = await CartService.getCarts()
  return res.status(200).json({
    status: 'success',
    data: carts
  })
})

const getCartByUserId = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params
  const cart = await CartService.getCartByUserId(id)
  if (!cart) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cart not found'
    })
  }
  return res.status(200).json({
    status: 'success',
    data: cart
  })
})

const addItem = catchAsyncHandler(async (req, res, next) => {
  const { userId, dishId, quantity } = req.body
  const cart = await CartService.addItem(userId, dishId, quantity)
  return res.status(200).json({
    status: 'success',
    data: cart
  })
})
const updateItem = catchAsyncHandler(async (req, res, next) => {
  const { userId, dishId, action, quantity } = req.body
  const updatedCart = await CartService.updateItem(userId, dishId, action, quantity)
  return res.status(200).json({
    status: 'success',
    data: updatedCart
  })
})
const removeItem = catchAsyncHandler(async (req, res, next) => {
  const { userId, dishId } = req.params
  const updatedCart = await CartService.removeItem(userId, dishId)
  return res.status(200).json({
    status: 'success',
    data: updatedCart
  })
})

module.exports = {
  getCarts,
  getCartByUserId,
  addItem,
  updateItem,
  removeItem
}
