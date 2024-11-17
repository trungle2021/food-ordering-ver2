const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler');
const RatingService = require('./rating-service');
const Dish = require('../dish/dish-model');
const addRating = catchAsyncHandler(async (res, req, next) => {
    const userId = req.userId;
    const payload = {
        ...req.body,
        userId
    }
    const data = await RatingService.ratingDishes(payload);
    return res.status(200).json({
      status: 'success'
    })
})

const getBatchRatings = catchAsyncHandler(async (req, res) => {
  const dishIds = await Dish.find({}).select('_id');
  const dishIdsArray = dishIds.map(dish => dish._id);
  console.log(dishIdsArray);
  const data = await RatingService.getBatchRatings(dishIdsArray);
    return res.status(200).json({
      status: 'success',
      data
    })
})

const updateBulkDishRating = catchAsyncHandler(async (req, res, next) => {
  const data = await RatingService.updateBulkDishRating();
  return res.status(200).json({
    status: 'success',
    data,
  });
});

const deleteAllRatings = catchAsyncHandler(async (req, res) => {
  await RatingService.deleteAllRatings();
  return res.status(200).json({
    status: 'success',
    message: 'Delete All Ratings Successfully',
  });
});

module.exports = {
    addRating,
    getBatchRatings,
    deleteAllRatings,
    updateBulkDishRating
}