const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');

// Initialize Redis client
const redis = new Redis(); // Configure Redis connection as needed

const SESSION_EXPIRY = 30 * 60; // 30 minutes in seconds

function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

async function createSession(userId, cartItems) {
  const sessionId = uuidv4();
  const sessionData = {
    userId,
    cartItems,
    total: calculateTotal(cartItems),
    createdAt: Date.now(),
  };

  await redis.setex(
    `checkout:${sessionId}`,
    SESSION_EXPIRY,
    JSON.stringify(sessionData)
  );

  return sessionId;
}

async function getSession(sessionId) {
  const data = await redis.get(`checkout:${sessionId}`);
  return data ? JSON.parse(data) : null;
}

async function updateSession(sessionId, updates) {
  const currentData = await getSession(sessionId);
  if (!currentData) {
    throw new Error('Checkout session not found');
  }

  const updatedData = { ...currentData, ...updates };
  await redis.setex(
    `checkout:${sessionId}`,
    SESSION_EXPIRY,
    JSON.stringify(updatedData)
  );
}

async function deleteSession(sessionId) {
  await redis.del(`checkout:${sessionId}`);
}

module.exports = {
  createSession,
  getSession,
  updateSession,
  deleteSession,
};