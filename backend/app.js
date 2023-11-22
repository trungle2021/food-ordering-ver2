const express = require('express');

const ErrorController = require('./controllers/error-controller')
const AppError = require('./utils/error_handler/app-error')
const path = require('path');
const morganMiddleware = require('./middleware/morgan')
const SwaggerRouter = require('./routes/swagger-router');
const app = express();
const apiRouter = require('./routes/router');


// config middleware
app.use(morganMiddleware)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use(SwaggerRouter)
app.use("/api/v1",apiRouter)

// Handle Unhandle middleware
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(ErrorController)

module.exports = app
