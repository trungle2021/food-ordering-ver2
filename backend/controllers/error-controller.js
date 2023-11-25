const logger = require('./../utils/logging/winston')

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
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
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (err.name === 'ValidationError') {
    // Handle validation errors
    res.status(400).json({ error: err.message })
  } else if (err.name === 'CastError') {
    // Handle cast errors
    res.status(400).json({ error: 'Invalid data' })
  } else if (err.name === 'MongoNetworkError') {
    // Handle MongoDB network errors
    res.status(503).json({ error: 'Error connecting to the database' })
  } else if (err.code === 11000) {
    // Handle duplicate key errors
    res.status(409).json({ error: 'Duplicate key error' })
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProduction(err, res)
  }
}

module.exports = ErrorController
