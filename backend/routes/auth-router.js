const express = require("express");
const router = express.Router();
const AuthController = require("./../controllers/auth-controller");


const validBodyLoginHandler = (req, res, next) => {
  const { email, password } = req.body;
    if (!email || !password) {
      next(new AppError("Email and Password is required", 400));
    }
    next()
}

router
  .post("/login",validBodyLoginHandler, AuthController.login)
  .post("/register", AuthController.register);

module.exports = router;
