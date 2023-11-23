const AppError = require("../utils/error_handler/app-error");
const User = require("./../models/user-model");
const logger = require("./../utils/logging/winston");

const getAll = async () => {
  try {
    return await User.find({});
  } catch (error) {
    logger.error(new AppError(error));
    throw new AppError("Failed to retrieve users", 500);
  }
};

const findOne = async (filter) => {
    const user = await User.findOne(filter);
    if (!user) {
      return null;
    }
    return user;
};

const findById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return null;
  }
  return user;
};

const create = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    throw new AppError("Failed to create users");
  }
};

module.exports = {
  getAll,
  findById,
  findOne,
  create,
};
