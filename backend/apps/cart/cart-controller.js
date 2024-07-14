const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const CartService = require('./cart-service')

const getCartByUserId = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const cart = await CartService.getCart({ user: userId })
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
  // console.log()
  const cart = await CartService.addItem(userId, dishId, quantity)
  return res.status(200).json({
    status: 'success',
    data: cart
  })
})
const updateItem = catchAsyncHandler(async (req, res, next) => {
  const { userId, dishId, updateQuantity } = req.body

  const updatedCart = await CartService.updateItem(userId, dishId, updateQuantity)
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

const findItem = catchAsyncHandler(async (req, res, next) => {
  const { itemId } = req.params
  const item = await CartService.findItem(itemId)
  return res.status(200).json({
    status: 'success',
    data: item
  })
})

module.exports = {
  getCartByUserId,
  addItem,
  updateItem,
  removeItem,
  findItem
}
