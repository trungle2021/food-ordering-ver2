const requestTypes = {
  PARAMS: 'params',
  BODY: 'body',
  QUERY: 'query'
}

function isRequestTypeValid (variable) {
  // Get all keys from the requestTypes object
  const keys = Object.keys(requestTypes)

  // Check if the variable is one of the keys
  return keys.includes(variable)
}

module.exports = {
  isRequestTypeValid,
  requestTypes
}
