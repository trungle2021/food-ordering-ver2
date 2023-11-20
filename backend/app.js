const express = require('express');

const ErrorController = require('./controllers/error-controller')
const AppError = require('./utils/app_error')
const morgan = require('morgan');
const path = require('path');
const app = express();


// config middleware
app.use(morgan("dev"))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Handle Unhandle middleware
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(ErrorController)

module.exports = app
