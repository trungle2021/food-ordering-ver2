const { isRequestTypeValid } = require('../request/request-features');

const validateRequest = (schema, types) => {
  /*
    type = [params, body, query]
    we can validate the request by the type of the request
    for example req.body, req.params, req.query
    */
  return (req, res, next) => {
    let mergedRequestData = {};
    for (const type of types) {
      if (!isRequestTypeValid(type)) {
        return res.status(500).json({
          status: 'error',
          error: 'Invalid request type',
        });
      }

      const requestData = req[type];
      mergedRequestData = { ...mergedRequestData, ...requestData };
    }

    const { error } = schema.validate(mergedRequestData, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      return res.status(400).json({
        status: 'fail',
        errorCount: errorMessages.length,
        message: errorMessages,
      });
    }
    next();
  };
};

module.exports = validateRequest;
