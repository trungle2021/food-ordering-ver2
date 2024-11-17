const Dish = require('../dish/dish-model');
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

const getBatchRatings = async (dishIds) => {

    const ratings = await Rating.aggregate([
        {
            $match: { dish: { $in: dishIds } }
        },
        {
            $group:{
                _id: "$dish",
                averageRating: { $avg: "$rating" },
                totalRating: { $sum: 1 }
            }
        }
    ]);

    return ratings;

}


const updateBulkDishRating = async () => {
    const dishIds = await Dish.find({}).select('_id');
    const dishIdsArray = dishIds.map(dish => dish._id);
    const ratings = await getBatchRatings(dishIdsArray);
    // Create bulk update rating field on Dish model
    const bulkUpdate = ratings.map(rating => ({
      updateOne: {
        filter: { _id: rating._id },
        update: { 
          $set: { 
            'rating.averageRating': rating.averageRating, 
            'rating.totalRating': rating.totalRating 
          } 
        },
      },
    }));
  
    await Dish.bulkWrite(bulkUpdate);
    return ratings;
  }

// calculate average rating point of a dish
const calculateAverageRatingPoint = async (dishId) => {
    const ratings = await Rating.find({ dishId });
    const totalRatingPoint = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRatingPoint = totalRatingPoint / ratings.length;
    return averageRatingPoint;
}

const deleteAllRatings = async () => {
    await Rating.deleteMany({});
}

module.exports = {
    addRating,
    getBatchRatings,
    calculateAverageRatingPoint,
    deleteAllRatings,
    updateBulkDishRating
}