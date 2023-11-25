const AppError = require("./../utils/error_handler/app-error");
const AuthService = require("./../services/auth-service");

const register = async (req, res, next) => {
  try {
    const userData = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      balance: req.body.balance,
      avatar: req.body.avatar,
    };
    const newUser = await AuthService.register(userData);
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    next(new AppError(err.message, err.status));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    if (token) {
      res.status(200).json({
        status: "success",
        data: {
          token,
        },
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
};
