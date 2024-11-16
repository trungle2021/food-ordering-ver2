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

module.exports = {
    addRating
}