const UserService = require("./../services/user-service");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const accessTokenExpired = process.env.JWT_ACCESS_TOKEN_EXPIRATION;

const register = async (userData) => {
  try {
    const newUser = await UserService.create(userData);
    const payload = {
      id: newUser._id,
    };
    const options = {
      expiresIn: accessTokenExpired,
    };
    const accessToken = jwt.sign(payload, secretKey, options);
    return {
      access_token: accessToken,
      user: newUser._doc,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (email, password) => {
  try {
    const userValid = await UserService.findOne({ email, password });
    if (!userValid) {
      return null;
    }
    const payload = {
      id: userValid._id,
    };
    const options = {
      expiresIn: accessTokenExpired,
    };
    const accessToken = jwt.sign(payload, secretKey, options);
    return {
      access_token: accessToken,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  register,
  login,
};
