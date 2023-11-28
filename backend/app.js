const express = require('express')
const app = express()

const path = require('path')
const morganMiddleware = require('./middleware/morgan')
const SwaggerRouter = require('./utils/swagger/swagger')
const apiRouter = require('./routes/router')
const JWT_ENABLE = process.env.JWT_ENABLE
const jwtFilterHandler = require('./middleware/jwt-filter')
const ErrorController = require('./apps/error/error-controller')
const AppError = require('./apps/error/app-error')

// config middleware

app.use(morganMiddleware)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// router
app.use(SwaggerRouter)
JWT_ENABLE === true && app.use(jwtFilterHandler)
app.use('/api/v1', apiRouter)

// Handle Unhandle middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(ErrorController)

module.exports = app
