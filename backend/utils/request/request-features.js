const requestTypes = require('../../constant/request-types');

function isRequestTypeValid(type) {
  // Get all keys from the requestTypes object
  const keys = Object.values(requestTypes);

  // Check if the variable is one of the keys
  return keys.includes(type);
}

module.exports = {
  isRequestTypeValid,
};
