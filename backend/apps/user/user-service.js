const AppError = require("../../utils/error/app-error");
const User = require("./user-model");

const getUsers = async () => {
  return await User.find({}).select("-password");
};

const getUser = async (filter) => {
  return await User.findOne(filter).populate({
    path: "user_address",
    match: {
      is_default_address: true,
    },
    select: {
      _id: 1,
      is_default_address: 1,
      address: 1,
    },
  });
};

const checkIfUserExists = async (userId) => {
  const count = await User.countDocuments({ _id: userId });
  return count > 0;
};

const createUser = async (user) => {
  const isEmailAlreadyExists = await User.findOne({ email: user.email });
  if (isEmailAlreadyExists) throw new AppError("Email already exists", 409);
  const isPhoneAlreadyExists = await User.findOne({ phone: user.phone });
  if (isPhoneAlreadyExists) throw new AppError("Phone already exists", 409);
  return await User.create(user);
};

const updateUser = async (filter, user) => {
  return await User.findOneAndUpdate(filter, user)
};

const deleteUser = async (filter) => {
  await User.deleteOne(filter);
};

module.exports = {
  getUsers,
  getUser,
  checkIfUserExists,
  createUser,
  updateUser,
  deleteUser,
};
