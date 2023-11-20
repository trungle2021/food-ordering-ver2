const ErrorController = (err,req,res,next) => {
    const errMsg = err.message
    const errStatusCode = err.statusCode || 500
    const errStatus = err.status

    res.status(errStatusCode).json({
        status: errStatus,
        message: errMsg
    })
}

module.exports = ErrorController;