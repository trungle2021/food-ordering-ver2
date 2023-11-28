const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const CartService = require('./cart-service')

const getCarts = catchAsyncHandler(async (req, res) => {
  const carts = await CartService.getCarts()
  return res.status(200).json({
    status: 'success',
    data: carts
  })
})

const getCart = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params.id
  const cart = await CartService.getCart(id)
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

const createCarts = catchAsyncHandler(async (req, res, next) => {
  const listCarts = req.body
  const carts = await CartService.createCarts(listCarts)
  return res.status(200).json({
    status: 'success',
    data: carts
  })
})
const createCart = catchAsyncHandler(async (req, res, next) => {})
const updateCart = catchAsyncHandler(async (req, res, next) => {})
const deleteCart = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getCarts,
  getCart,
  createCarts,
  createCart,
  updateCart,
  deleteCart
}
