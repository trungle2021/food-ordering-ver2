// const Redis = require('ioredis');
// const { v4: uuidv4 } = require('uuid');
// const UserService = require('../user/user-service');

// // Initialize Redis client
// const redis = new Redis(); // Configure Redis connection as needed

// const SESSION_EXPIRY = 30 * 60; // 30 minutes in seconds

// function calculateOrderTotal(cartItems) {
//   return cartItems.reduce((acc, item) => acc + item.amount, 0);
// }


// async function createSession(userId, cartItems, shipping_address) {
//   const sessionId = uuidv4();
//   const sessionData = {
//     user: userId,
//     order_details: cartItems,
//     shipping_address,
//     order_total: calculateOrderTotal(cartItems),
//     order_date: Date.now(),
//   };

//   await redis.setex(
//     `checkout:${sessionId}`,
//     SESSION_EXPIRY,
//     JSON.stringify(sessionData)
//   );

//   return {sessionId, sessionData};
// }

// async function getSession(sessionId) {
//   const data = await redis.get(`checkout:${sessionId}`);
//   return data ? JSON.parse(data) : null;
// }

// async function updateSession(sessionId, updates) {
//   const currentData = await getSession(sessionId);
//   if (!currentData) {
//     throw new Error('Checkout session not found');
//   }

//   // Handle specific field updates
//   const updatedData = await applySessionUpdates(currentData, updates);

//   // Save to Redis
//   await redis.setex(
//     `checkout:${sessionId}`,
//     SESSION_EXPIRY,
//     JSON.stringify(updatedData)
//   );

//   return updatedData;
// }

// // Helper function to handle specific field updates
// async function applySessionUpdates(currentData, updates) {
//   let sessionData = { ...currentData };

//   // Handle shipping address update
//   if (updates.addressId) {
//     const user = await UserService.getUser({ _id: currentData.user });
//     const address = user.user_address.find(addr => addr.id === updates.addressId);
//     sessionData.shipping_address = address;
//   }

//   // Handle order details update
//   if (updates.order_details) {
//     sessionData.order_details = updates.order_details;
//     sessionData.order_total = calculateOrderTotal(updates.order_details);
//   }

//   // Apply remaining updates
//   return {
//     ...sessionData,
//     ...updates,
//     // Preserve calculated fields
//     order_total: sessionData.order_total,
//     shipping_address: sessionData.shipping_address,
//   };
// }

// async function deleteSession(sessionId) {
//   await redis.del(`checkout:${sessionId}`);
// }

// module.exports = {
//   createSession,
//   getSession,
//   updateSession,
//   deleteSession,
// };