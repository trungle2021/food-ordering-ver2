const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')
const CartService = require('./cart-service')



const getCartByUserId = catchAsyncHandler(async (req, res, next) => {
  const userId = req.userId
  const cart = await CartService.getCartByUserId({user: userId})
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
  const userId = req.userId
  const { dishId, quantity } = req.body
  const cart = await CartService.addItem(userId, dishId, quantity)
  return res.status(200).json({
    status: 'success',
    data: cart
  })
})
const updateItem = catchAsyncHandler(async (req, res, next) => {
  const userId = req.userId
  const { dishId, updateQuantity } = req.body
  const updatedCart = await CartService.updateItem(userId, dishId, updateQuantity)
  return res.status(200).json({
    status: 'success',
    data: updatedCart
  })
})
const removeItem = catchAsyncHandler(async (req, res, next) => {
  const userId = req.userId
  const { dishId } = req.params
  const updatedCart = await CartService.removeItem(userId, dishId)
  return res.status(200).json({
    status: 'success',
    data: updatedCart
  })
})

module.exports = {
  getCartByUserId,
  addItem,
  updateItem,
  removeItem
}
