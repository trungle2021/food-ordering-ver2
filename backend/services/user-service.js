const AppError = require("../utils/error_handler/app-error");
const User = require("./../models/user-model");
const logger = require("./../utils/logging/winston");

const getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (error) {
    logger.error(new AppError(error));
    throw new AppError("Failed to retrieve users", 500);
  }
};

const findOneUser = async (filter) => {
  try {
    const user = await User.find(filter);
    if (!user) {
      throw new AppError("User not found", 401);
    }
    return user;
  } catch (error) {
    throw new AppError("Failed to retrieve users", 500);
  }
};

const createUser = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    throw new AppError("Failed to create users");
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
