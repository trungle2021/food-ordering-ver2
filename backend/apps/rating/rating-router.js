const express = require('express');
const { addRating} = require('../controllers/ratingController');
const router = express.Router();

// Add a new rating
router
.route('/rating')
.post(validateRequest(ratingDishesRequestSchema, [BODY]), addRating)

module.exports = router;
