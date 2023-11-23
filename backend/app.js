const express = require('express');
const app = express();

const ErrorController = require('./controllers/error-controller')
const AppError = require('./utils/error_handler/app-error')
const path = require('path');
const morganMiddleware = require('./middleware/morgan')
const SwaggerRouter = require('./routes/swagger-router');
const apiRouter = require('./routes/router');
const jwtFilterHandler = require('./middleware/jwt-filter');

// const token = req.header('authorization');
// config middleware

app.use(morganMiddleware)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(req.url.replace('/api/v1',''))
    console.log(req.header("authorization"));
    next()
})
//router
app.use(SwaggerRouter)
app.use(jwtFilterHandler)
app.use("/api/v1",apiRouter)

// Handle Unhandle middleware
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(ErrorController)

module.exports = app
