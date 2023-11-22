const UserService = require("./../services/user-service");
const AppError = require("./../utils/error_handler/app-error");

const signUp = async (req, res,next) => {
  try {
    const data = req.body;
    const newUser = {
      "name": data.name,
      "password": data.password,
      "email": data.email,
      "balance": data.balance,
      "avatar": data.avatar,
    }
    await UserService.createUser(newUser);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (err) {
    next(new AppError(err.message, 409));
  }
};

module.exports = {
  signUp,
};
