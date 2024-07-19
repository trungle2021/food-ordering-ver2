const express = require('express')
const router = express.Router()
const { login, register, logout, renewAccessToken } = require('./../auth/auth-controller')
const validateRequest = require('../../utils/joi/validate-request-schema')
const { loginRequestSchema, registerRequestSchema, logoutRequestSchema, refreshTokenRequestSchema } = require('./auth-request-validator')
const { BODY, PARAMS } = require('../../constant/request-types')

router
  .post('/login', validateRequest(loginRequestSchema, [BODY]), login)
  .post('/register', validateRequest(registerRequestSchema, [BODY]), register)
  .post('/logout/:userId', validateRequest(logoutRequestSchema, [PARAMS]), logout)
  .post('/refresh-token', validateRequest(refreshTokenRequestSchema, [BODY]), renewAccessToken)

module.exports = router
