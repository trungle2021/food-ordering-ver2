const validateObjectAgainstSchema = (object, schema) => {
  const { error } = schema.validate(object, { abortEarly: false })
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message)
    return {
      isValid: false,
      data: object,
      error_count: error.details.length,
      errors: errorMessages
    }
  }
  return {
    isValid: true,
    data: object
  }
}

module.exports = validateObjectAgainstSchema
