const { isRequestTypeValid } = require("../request/request-features")

const validateRequest = (schema, type) => {
  return (req, res, next) => {
    console.log("Request type: " + type)

    const requestData = req[type]

    if(!isRequestTypeValid(type)){
      return res.status(500).json({
        status: 'error',
        error: 'Invalid request type'
      })
    }

    const { error } = schema.validate(requestData, { abortEarly: false })

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message)

      return res.status(400).json({
        status: 'fail',
        errorCount: errorMessages.length,
        message: errorMessages
      })
    }
    next()
  }
}

module.exports = validateRequest
