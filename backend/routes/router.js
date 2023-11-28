const express = require('express')
const apiRoute = express()
const UserRouter = require('../apps/user/user-address-router')
const MealRouter = require('./../apps/meal/meal-router')
const CategoryRouter = require('./../apps/category/category-router')
const AuthRouter = require('./../apps/auth/auth-router')

apiRoute.use('/meals', MealRouter)
apiRoute.use('/categories', CategoryRouter)
apiRoute.use('/users', UserRouter)
apiRoute.use('/auth', AuthRouter)

module.exports = apiRoute
