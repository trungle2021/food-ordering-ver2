const express = require('express')
const apiRoute = express()
const userRouter = require('./user-router')
const authRouter = require('./auth-router')

apiRoute.use('/users', userRouter)
apiRoute.use('/auth', authRouter)

module.exports = apiRoute
