const User = require('./../models/user-model');


const getAllUsers = async () => {
  return await User.find({});
};

const getUserBy = async (filter) => {
  return await User.find(filter);
};

const createUser = async (user) => {
    return await User.create(user)
}


module.exports = {
  getAllUsers,
  getUserBy,
  createUser
};
