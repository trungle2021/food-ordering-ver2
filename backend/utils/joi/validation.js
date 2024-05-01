const validateObjectAgainstSchema = (object, schema) => {
  const { error } = schema.validate(object, { abortEarly: false })
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message)
    return {
      data: object,
      isValid: false,
      error_count: error.details.length,
      errors: errorMessages
    }
  }
  return {
    result: true,
    data: object
  }
}

module.exports = validateObjectAgainstSchema
