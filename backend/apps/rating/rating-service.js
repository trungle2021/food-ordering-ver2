const DishService = require('../dish/dish-service')
const UserService = require('../user/user-service')
const Rating = require('./rating-model')

const addRating = async (payload) => {
    const { dishId, userId, ratingPoint } = payload;

    // Check if the dish exists
    const dish = await DishService.checkIfDishExists({ dish: dishId });
    if (!dish) {
        throw new AppError('Dish not existed', 404);
    }

    // Check if the user exists
    const user = await UserService.checkIfUserExists({ user: userId });
    if (!user) {
        throw new AppError('User not existed', 404);
    }

    // Create a new rating entry
    const newRating = await Rating.create({
        dishId,
        userId,
        rating: ratingPoint,
    });

    return newRating; // Optionally return the created rating or a success message
};

module.exports = {
    addRating
}