const logger = require('../../utils/logging/winston')

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProduction = (err, res) => {
  // Operational Error, trusted send error response to client
  if (err.isOperationError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    // Bug or unknown error: dont leak error response to client
    logger.error(new Error('ERROR 🎆' + err.message))
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    })
  }
}

const ErrorController = (err, req, res, next) => {
  err.status = err.status || 'error'

  switch (err.name) {
    case 'ValidationError':
      err.statusCode = 400
      err.message = 'Error connecting to the database'
      break
    case 'CastError':
      err.statusCode = 400
      err.message = 'Invalid data'
      break
    case 'MongoNetworkError':
      err.statusCode = 503
      err.message = 'Error connecting to the database'
      break
    default:
      if (err.code === 11000) {
        err.statusCode = 409
        err.name = 'Duplicate Key Error'
      } else {
        err.statusCode = err.statusCode || 500
      }
      break
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProduction(err, res)
  }
}

module.exports = ErrorController
