const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { createBalance } = require('../balance/balance-service');

async function createInitialBalance(userId) {
    const initialAmount = Number((Math.random() * (500 - 50) + 50).toFixed(2));
    return await createBalance({ 
      user: userId, 
      amount: initialAmount 
    });
  }

async function createMockUsers() {
  const mockUsers = [];
  const hashedPassword = await bcrypt.hash('Password123!', 12);

  function generateValidPhone() {
    return faker.string.numeric(10);
  }

  for (let i = 0; i < 10; i++) {
    const isOAuthUser = i < 5;

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: generateValidPhone(),
      avatar: faker.image.avatar(),
      is_email_verified: faker.datatype.boolean(),
      isOAuthUser,
      user_address: [
        {
          address: faker.location.streetAddress(true),
          recipient: faker.person.fullName(),
          phone: generateValidPhone(),
          is_default_address: true
        },
        {
          address: faker.location.streetAddress(true),
          recipient: faker.person.fullName(),
          phone: generateValidPhone(),
          is_default_address: false
        }
      ]
    };

    if (!isOAuthUser) {
      user.password = hashedPassword;
    }

    if (isOAuthUser) {
      user.oauthProviders = [
        {
          provider: faker.helpers.arrayElement(['google', 'facebook']),
          providerId: faker.string.uuid(),
          profile: {
            name: user.name,
            profilePicture: user.avatar
          }
        }
      ];
    }

    mockUsers.push(user);
  }

  return mockUsers;
}

// Modified seedUsers function to create balances after users are created
async function seedUsers() {
  try {
    const User = require('./user-model');
    const mockUsers = await createMockUsers();
    
    // First, create all users
    const createdUsers = await User.insertMany(mockUsers);
    console.log('Successfully seeded 10 mock users');

    // Then create balance for each user
    for (const user of createdUsers) {
      await createInitialBalance(user._id);
    }
    console.log('Successfully created initial balances for all users');

  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

module.exports = { createMockUsers, seedUsers }; 