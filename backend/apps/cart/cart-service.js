const AppError = require('../../utils/error/app-error')
const DishService = require('../dish/dish-service')
const StockService = require('../stock/stock-service')
const Cart = require('./cart-model')
const { INCREMENT, DECREMENT } = require('../../constant/cart-action')
const { moneyFormatter } = require('../../utils/formater/money-formatter')

const getCarts = async () => {
  return await Cart.find({}).populate({ path: 'category', select: 'name' })
}

const getCartByUserId = async (queryString) => {
  return await Cart.findOne(queryString).populate({
    path: 'items.dish',
    select: 'name price image is_active'
  })
}

const addItem = async (userId, dishId, quantity) => {
  // ! need to check userId exits

  const dish = await DishService.getDish({ _id: dishId })

  if (!dish) {
    throw new AppError('Dish not exists', 404)
  }

  const cart = await Cart.findOne({ user: userId }).populate({
    path: 'items.dish',
    select: 'name price image is_active'
  })

  const newItem = {
    dish,
    quantity,
    amount: moneyFormatter(dish.price * quantity)
  }

  if (!cart) {
    // If the cart does not exist, create a new cart.
    const items = [newItem]
    const cartInfo = {
      user: userId,
      items,
      total: newItem.amount
    }

    const newCart = await Cart.create(cartInfo)
    return await Cart.findById(newCart._id).populate({
      path: 'items.dish',
      select: 'name price image is_active'
    })
  }

  // If the newItem already exists in the items listconst itemIndex = cart.items.findIndex(item => item.dish === newItem.dish);
  const { item: itemExistsInCart } = findItemInCart(cart, dish._id.toString())
  if (!itemExistsInCart) {
    // If the item does not exist, add a new item to the items list.

    const isStockEnough = await StockService.checkStock(dish._id, 1)
    if (!isStockEnough) {
      throw new AppError('Item has reached the maximum quantity limit', 409)
    }
    const updatedItems = [...cart.items, newItem]
    cart.items = updatedItems
    cart.total = moneyFormatter(cart.total + newItem.amount)
    cart.updated_at = Date.now()
  } else {
    // If the item already exists, update the quantity of the existing item.
    const isStockEnough = await StockService.checkStock(dish._id, quantity)
    if (!isStockEnough) {
      throw new AppError('Item has reached the maximum quantity limit', 409)
    }
    const updateAmount = dish.price * quantity
    cart.total = moneyFormatter(cart.total + updateAmount)
    itemExistsInCart.quantity += newItem.quantity
    itemExistsInCart.amount = moneyFormatter(
      itemExistsInCart.amount + newItem.amount
    )
    cart.updated_at = Date.now()
  }
  return await cart.save()
}

const updateItem = async (userId, dishId, updateQuantity) => {
  if (updateQuantity < 0) {
    throw new AppError('Not enough quantity in cart', 409)
  }

  // ! need to check userId exits

  const dish = await DishService.getDish({ _id: dishId })

  if (!dish) {
    throw new AppError('Dish not exists', 404)
  }

  const cart = await Cart.findOne({ user: userId }).populate({
    path: 'items.dish',
    select: 'name price image is_active'
  })
  const { itemIndex, item: itemExistsInCart } = findItemInCart(
    cart,
    dish._id.toString()
  )

  if (!itemExistsInCart) {
    throw new AppError('Item not exists in the cart', 409)
  }

  const action =
    updateQuantity > itemExistsInCart.quantity ? INCREMENT : DECREMENT
  switch (action) {
    case INCREMENT:
      return await incrementCountAndUpdate(
        cart,
        itemIndex,
        dish,
        updateQuantity
      )
    case DECREMENT:
      return await decrementCountAndUpdate(
        cart,
        itemIndex,
        dish,
        updateQuantity
      )
    default:
      throw new AppError('Invalid action', 400)
  }
}

const incrementCountAndUpdate = async (
  cart,
  itemIndex,
  dish,
  updateQuantity
) => {
  const itemExistsInCart = cart.items[itemIndex]
  const isStockEnough = await StockService.checkStock(dish._id, updateQuantity)
  if (!isStockEnough) {
    throw new AppError('Item has reached the maximum quantity limit', 409)
  }

  const updateAmount = dish.price * updateQuantity
  const currentAmount = itemExistsInCart.amount
  cart.total = moneyFormatter(cart.total + (updateAmount - currentAmount))
  itemExistsInCart.quantity = updateQuantity
  itemExistsInCart.amount = moneyFormatter(updateAmount)
  return await cart.save()
}

const decrementCountAndUpdate = async (
  cart,
  itemIndex,
  dish,
  updateQuantity
) => {
  const itemExistsInCart = cart.items[itemIndex]

  const updateAmount = dish.price * updateQuantity
  const currentAmount = itemExistsInCart.amount
  cart.total = moneyFormatter(cart.total - (currentAmount - updateAmount))

  if (updateQuantity === 0) {
    cart.items.splice(itemIndex, 1)
  } else {
    itemExistsInCart.quantity = updateQuantity
    itemExistsInCart.amount = moneyFormatter(updateAmount)
  }

  return await cart.save()
}

const removeItem = async (userId, dishId) => {
  const cart = await Cart.findOne({ user: userId }).populate({
    path: 'items.dish',
    select: 'name price image is_active'
  })
  if (!cart) {
    throw new AppError('Cart not exists', 404)
  }
  const { itemIndex, item: itemExistsInCart } = findItemInCart(cart, dishId)
  if (itemExistsInCart) {
    cart.items.splice(itemIndex, 1)
    cart.total = moneyFormatter(cart.total - itemExistsInCart.amount)
    return await cart.save()
  }
}

const findItemInCart = (cart, dishId) => {
  const itemIndex = cart.items.findIndex(
    (item) => item.dish._id.toString() === dishId
  )
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
