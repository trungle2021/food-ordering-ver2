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
  const { id } = req.params.id
  const cart = await CartService.getCartByUserId(id)
  if (!cart) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: cart
  })
})


const addToCart = catchAsyncHandler(async (req, res, next) => {
  const {userId, dishId, quantity} = req.params
  const cart = await CartService.addToCart(userId, dishId, quantity)
  return res.status(200).json({
    status:'success',
    data: cart
  })
})
const updateCart = catchAsyncHandler(async (req, res, next) => {})
const deleteCart = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getCarts,
  getCartByUserId,
  addToCart,
  updateCart,
  deleteCart
}
