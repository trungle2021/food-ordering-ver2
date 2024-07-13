const validateRequest = (schema, type) => {
  return (req, res, next) => {
    const requestData = req[type]
    if (!requestData) {
      return res.status(400).json({
        error: 'Invalid input'
      })
    }

    const { error } = schema.validate(requestData, { abortEarly: false })

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message)
      return res.status(400).json({
        message: errorMessages
      })
    }
    next()
  }
}

module.exports = validateRequest
