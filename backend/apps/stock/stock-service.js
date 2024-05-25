const AppError = require('../error/app-error')
const Stock = require('./stock-model')
const DishService = require('../dish/dish-service')

const checkStock = async (item, incrementQuantity) => {
  // if (quantity of current item + quantity user want to add ) is greater than quantity of stock => return false
  // if (quantity of stock === 0 ) => return false
  const stock = await Stock.findOne({ dish: item.dish })
  if (!stock) {
    throw new AppError('The stock for this dish is not initialized. Please initialize it first', 409)
  }
  if (stock.quantity === 0 || item.quantity + incrementQuantity > stock.quantity) {
    return false
  }

  return true
}

const createStock = async (dishId, quantity) => {
// Check if the dish exists
  const dish = await DishService.getDish({ _id: dishId })
  if (!dish) {
    throw new AppError('Dish does not exist', 404)
  }

  // Create a new stock entry
  const stock = new Stock({ dish: dishId, quantity })

  // Save the stock entry to the database
  await stock.save()

  return stock
}

module.exports = {
  createStock,
  checkStock
}
