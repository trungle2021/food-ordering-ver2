const express = require('express')
const router = express.Router();
const UserController = require('./../controllers/user-controller')

router.route('/')
.get(UserController.getAllUsers)

router.route('/:id')
.get(UserController.getUser)

module.exports = router;
