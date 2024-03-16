const express = require('express')
const router = express.Router()
const AuthController = require('./../auth/auth-controller')
const AppError = require('../error/app-error')

const validBodyLoginHandler = (req, res, next) => {
  const { phone, password } = req.body
  if (!phone || !password) {
    next(new AppError('Phone and Password is required', 400))
  }
  next()
}

router
  .post('/login', validBodyLoginHandler, AuthController.login)
  .post('/register', AuthController.register)

module.exports = router
