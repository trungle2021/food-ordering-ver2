const AppError = require('../error/app-error')
const UserService = require('../user/user-service')
const DishService = require('../dish/dish-service')
const Cart = require('./cart-model')

const getCarts = async () => {
  return await Cart.find({}).populate({ path: 'category', select: 'name' })
}

const getCart = async (userId) => {
  const cart = await Cart.find({user: userId})
  if (!cart) {
    return null
  }
  return cart
}

const addToCart = async (userId, dishId, quantity) => {
  const isUserExists = await UserService.checkIfUserExists(userId)
  if(!isUserExists) {
    throw new AppError(`User not exists`, 404)
  }
  const dish = await DishService.getDish({dish: dishId})
  if(!dish){
    throw new AppError(`Dish not exists`, 404)
  }
  const isStockEnough = await StockService.checkStock(dishId, quantity)
  if(!isStockEnough){
    throw new AppError(`Stock not enough`, 409)
  }
  const cart = await Cart.findOne({user: userId})
  const newItem = {
    dish: dishId,
    amount: dish.price * quantity,
    quantity: quantity
  }
  try{
    if (!cart) {
      // create a new cart
      const items = [newItem]
      const cartInfo = {
        user: userId,
        items,
        total: dish.price * quantity,
      }
      return await Cart.create(cartInfo)
    }else{
      // if cart is already existing then update item to list items
      let total = cart.total + newItem.amount
      const updatedItems = [...cart.items, newItem]
      const newValues = {items: updatedItems, total, updated_at: Date.now()}
      return await Cart.updateOne({_id: cart._id}, {$set: newValues })
    }
  }catch(e){
    throw new AppError(e.message, 500)
  }
}

const updateItem = async() => {

}

const deleteItem = async (userId, dishId) => {
  const cart = await Cart.findOne({_id: cart._id})
}

module.exports = {
  getCarts,
  getCart,
  addToCart,
  updateItem,
  deleteItem
}
