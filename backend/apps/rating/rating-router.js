const express = require('express');
const { addRating, deleteAllRatings, getBatchRatings, updateBulkDishRating } = require('./rating-controller');
const router = express.Router();


router
  .route('/delete-all-ratings')
  .delete(deleteAllRatings);

// Add a new rating
// router
// .route('/')
// .post(validateRequest(ratingDishesRequestSchema, [BODY]), addRating)
router
  .route('/update-bulk-ratings')
  .put(updateBulkDishRating);

router
.route('/batch-ratings')
.get(getBatchRatings)

module.exports = router;
