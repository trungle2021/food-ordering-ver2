const Rating = require('./rating-model'); 
const User = require('../user/user-model');
const Dish = require('../dish/dish-model');  

async function generateMockRatings() {
  try {
    // Get all users and dishes from the database
    const users = await User.find({}).lean();
    const dishes = await Dish.find({}).lean();

    if (!users.length || !dishes.length) {
      throw new Error('No users or dishes found in the database');
    }

    const ratings = [];

    // Generate random ratings for each dish
    for (const dish of dishes) {
      // Randomly select 30-70% of users to rate each dish
      const numberOfRaters = Math.floor(
        users.length * (Math.random() * 0.4 + 0.3)
      );
      
      const shuffledUsers = users.sort(() => Math.random() - 0.5);
      const selectedUsers = shuffledUsers.slice(0, numberOfRaters);

      for (const user of selectedUsers) {
        const rating = {
          user: user._id,
          dish: dish._id,
          rating: Math.floor(Math.random() * 4) + 2, // Ratings between 2-5
          review: generateRandomComment(),
        };
        ratings.push(rating);
      }
    }

    // Insert ratings in batches of 1000
    const batchSize = 1000;
    for (let i = 0; i < ratings.length; i += batchSize) {
      const batch = ratings.slice(i, i + batchSize);
      await Rating.insertMany(batch, { ordered: false });
      console.log(`Inserted batch ${i / batchSize + 1}`);
    }

    console.log(`Successfully created ${ratings.length} mock ratings`);
  } catch (error) {
    console.error('Error generating mock ratings:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

function generateRandomComment() {
  const comments = [
    'Really enjoyed this dish!',
    'Great flavors and presentation',
    'Decent portion size, good taste',
    'Would order again',
    'Pretty good overall',
    'Nice combination of flavors',
    'Solid choice',
    'Better than expected',
    'Good value for money',
    'Fresh ingredients',
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

async function seedRatings() {
    try {
      await generateMockRatings();
      console.log('Successfully seeded 10 mock ratings');
    } catch (error) {
        console.error('Error seeding ratings:', error);
    }
  }
  
  module.exports = { seedRatings }; 