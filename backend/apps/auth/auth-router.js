const express = require('express');
const router = express.Router();
const { login, register, logout, renewAccessToken } = require('./../auth/auth-controller');
const validateRequest = require('../../utils/joi/validate-request-schema');
const {
  loginRequestSchema,
  registerRequestSchema,
  refreshTokenRequestSchema,
} = require('./auth-request-validator');
const { BODY } = require('../../constant/request-types');

router
  .post('/login', validateRequest(loginRequestSchema, [BODY]), login)
  .post('/register', validateRequest(registerRequestSchema, [BODY]), register)
  .post('/logout', logout)
  .post('/refresh-token', validateRequest(refreshTokenRequestSchema, [BODY]), renewAccessToken);

module.exports = router;
