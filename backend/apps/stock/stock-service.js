const AppError = require('../../utils/error/app-error');
const Stock = require('./stock-model');
const Dish = require('../dish/dish-model');
const DishService = require('../dish/dish-service');

const checkStock = async (dishId, updateQuantity) => {
  // if (quantity of current item + quantity user want to add ) is greater than quantity of stock => return false
  // if (quantity of stock === 0 ) => return false
  const stock = await Stock.findOne({ dish: dishId });
  if (!stock) {
    throw new AppError(
      'The stock for this dish is not initialized. Please initialize it first',
      409
    );
  }
  if (stock.quantity === 0 || updateQuantity > stock.quantity) {
    return false;
  }

  return true;
};

const upsertStock = async ({ dishId, quantityUpdate }) => {
  // Check if the dish exists
  const dish = await DishService.getDish({ _id: dishId });
  if (!dish) {
    throw new AppError('Dish does not exist', 404);
  }

  // Find the existing stock
  const existingStock = await Stock.findOne({ dish: dishId });

  if (existingStock) {
    // Stock exists, update quantity based on the comparison
    const currentQuantity = existingStock.quantity;
    const newQuantity = quantityUpdate > currentQuantity
      ? currentQuantity + quantityUpdate
      : Math.max(currentQuantity - quantityUpdate, 0);

    const updatedStock = await Stock.findOneAndUpdate(
      { dish: dishId },
      { $set: { quantity: newQuantity } },
      { new: true, runValidators: true }
    );

    return updatedStock;
  } else {
    // Stock doesn't exist, create new one
    const newStock = new Stock({ dish: dishId, quantity: quantityUpdate });
    await newStock.save();
    return newStock;
  }
};

const initializeStockForAllDishes = async () => {
  try {
    // Get all dishes
    const allDishes = await Dish.find({});

    // Prepare stock entries for all dishes
    const stockEntries = allDishes.map(dish => ({
      dish: dish._id,
      quantity: 10,
    }));

    // Use bulkWrite for efficient upsert operation
    const bulkOps = stockEntries.map(entry => ({
      updateOne: {
        filter: { dish: entry.dish },
        update: { $set: { quantity: entry.quantity } },
        upsert: true,
      }
    }));

    const result = await Stock.bulkWrite(bulkOps);

    return {
      message: `Initialized or updated stock for ${allDishes.length} dishes`,
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount,
    };
  } catch (error) {
    console.error('Error in initializeStockForAllDishes:', error);
    throw new AppError('Failed to initialize stock for dishes', 500);
  }
};      

const deleteAllStock = async () => {
  try {
    const result = await Stock.deleteMany({});

    return {
      message: `Deleted all stock entries`,
      deletedCount: result.deletedCount,
    };
  } catch (error) {
    console.error('Error in deleteAllStock:', error);
    throw new AppError('Failed to delete all stock entries', 500);
  }
};

module.exports = {
  checkStock,
  upsertStock,
  initializeStockForAllDishes,
  deleteAllStock,
};
