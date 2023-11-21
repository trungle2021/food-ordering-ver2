const UserService = require("./../services/user-service");
const AppError = require("./../utils/error_handler/app-error");

const signUp = async (req, res,next) => {
  try {
    const data = req.body;
    await UserService.createUser(data);
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
