const express = require('express')
const router = express.Router()
const AuthController = require('./../auth/auth-controller')
const AppError = require('../error/app-error')

const validBodyLoginHandler = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    next(new AppError('Email and Password is required', 400))
  }
  next()
}

router
  .post('/login', validBodyLoginHandler, AuthController.login)
  .post('/register', AuthController.register)
  .post('/logout', AuthController.logout)
  .post('/refresh-token', AuthController.getNewAccessToken)

module.exports = router
