const AppError = require('../error/app-error')
const UserService = require('../user/user-service')
const DishService = require('../dish/dish-service')
const StockService = require('../stock/stock-service')
const Cart = require('./cart-model')
const { INCREMENT, DECREMENT } = require('../../constant/cart-action')

const getCarts = async () => {
  return await Cart.find({}).populate({ path: 'category', select: 'name' })
}

const getCartByUserId = async (userId) => {
  return await Cart.findOne({ user: userId }).populate({ path: 'items.dish', select: 'name price image is_active' })
}

const addItem = async (userId, dishId, quantity) => {
  const [isUserExists, dish] = await Promise.all([
    UserService.checkIfUserExists(userId),
    DishService.getDish({ _id: dishId })
  ])

  if (!isUserExists) {
    throw new AppError('User not exists', 404)
  }

  if (!dish) {
    throw new AppError('Dish not exists', 404)
  }

  const cart = await Cart.findOne({ user: userId }).populate({ path: 'items.dish', select: 'name price image is_active' })

  const newItem = {
    dish: dishId,
    amount: dish.price * quantity,
    quantity
  }

  if (!cart) {
    // If the cart does not exist, create a new cart.
    const items = [newItem]
    const cartInfo = {
      user: userId,
      items,
      total: newItem.amount
    }
    return (await Cart.create(cartInfo)).populate({ path: 'items.dish', select: 'name price image is_active' })
  }
  const total = cart.total + newItem.amount

  // If the newItem already exists in the items listconst itemIndex = cart.items.findIndex(item => item.dish === newItem.dish);
  const { itemIndex, item: itemExistsInCart } = findItemInCart(cart, dishId)
  let newValues = {}
  if (!itemExistsInCart) {
    // If the item does not exist, add a new item to the items list.
    const isStockEnough = await StockService.checkStock(newItem, 0)
    if (!isStockEnough) {
      throw new AppError('Stock is not enough', 409)
    }
    const updatedItems = [...cart.items, newItem]
    newValues = { items: updatedItems, total, updated_at: Date.now() }
  } else {
    // If the item already exists, update the quantity of the existing item.
    const isStockEnough = await StockService.checkStock(itemExistsInCart, quantity)
    if (!isStockEnough) {
      throw new AppError('Stock is not enough', 409)
    }
    cart.items[itemIndex].quantity += newItem.quantity
    cart.items[itemIndex].amount += newItem.amount
    newValues = { items: cart.items, total, updated_at: Date.now() }
  }
  return await Cart.updateOne({ _id: cart._id }, { $set: newValues })
}

const updateItem = async (userId, dishId, action, quantity) => {
  const [isUserExists, dish] = await Promise.all([
    UserService.checkIfUserExists(userId),
    DishService.getDish({ _id: dishId })
  ])

  if (!isUserExists) {
    throw new AppError('User not exists', 404)
  }

  if (!dish) {
    throw new AppError('Dish not exists', 404)
  }
  const cart = await Cart.findOne({ user: userId }).populate({ path: 'items.dish', select: 'name price image is_active' })

  switch (action) {
    case INCREMENT:
      return await incrementCountAndUpdate(cart, dish, quantity)
    case DECREMENT:
      return await decrementCountAndUpdate(cart, dish, quantity)
    default:
      throw new AppError('Invalid action', 400)
  }
}

const incrementCountAndUpdate = async (cart, dish, quantity) => {
  const { item: itemExistsInCart } = findItemInCart(cart, dish._id.toString())
  if (!itemExistsInCart) {
    throw new AppError('Item not exists in the cart', 409)
  }
  const isStockEnough = await StockService.checkStock(itemExistsInCart, quantity)
  if (!isStockEnough) {
    throw new AppError('Stock is not enough', 409)
  }

  itemExistsInCart.quantity += quantity
  itemExistsInCart.amount += dish.price * quantity
  cart.total += dish.price * quantity
  return await cart.save()
}

const decrementCountAndUpdate = async (cart, dish, updateQuantity) => {
  const { itemIndex, item: itemExistsInCart } = findItemInCart(cart, dish._id.toString())
  if (!itemExistsInCart) {
    throw new AppError('Item not exists in the cart', 409)
  }

  if (itemExistsInCart.quantity < updateQuantity) {
    throw new AppError('Not enough quantity in cart', 409)
  }

  itemExistsInCart.quantity -= updateQuantity
  itemExistsInCart.amount -= dish.price * updateQuantity
  cart.total -= dish.price * updateQuantity
  console.log(typeof cart.total)

  if (itemExistsInCart.quantity === 0) {
    cart.items.splice(itemIndex, 1)
  }

  return await cart.save()
}

const removeItem = async (userId, dishId) => {
  const cart = await Cart.findOne({ user: userId }).populate({ path: 'items.dish', select: 'name price image is_active' })
  if (!cart) {
    throw new AppError('Cart not exists', 404)
  }
  const { itemIndex, item: itemExistsInCart } = findItemInCart(cart, dishId)
  if (itemExistsInCart) {
    cart.items.splice(itemIndex, 1)
    cart.total -= itemExistsInCart.amount
    return await cart.save()
  }
}

const findItemInCart = (cart, dishId) => {
  const itemIndex = cart.items.findIndex(item => item.dish._id.toString() === dishId)
  const item = cart.items[itemIndex]
  return { itemIndex, item }
}

module.exports = {
  getCarts,
  getCartByUserId,
  addItem,
  updateItem,
  removeItem
}
