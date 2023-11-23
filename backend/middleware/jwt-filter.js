const jwt = require("jsonwebtoken");
const whitelist = require("./../utils/whitelist/whitelist-url");
const UserService = require("./../services/user-service");
const AppError = require("../utils/error_handler/app-error");
const secretKey = process.env.JWT_SECRET_KEY;

const jwtFilterHandler = async (req, res, next) => {
  const currentUrl = req.url.replace("/api/v1", "");
  const authHeader = req.header("authorization");

  for (let url of whitelist) {
    if (currentUrl.startsWith(url)) {
      next();
    }
  }
  if (!authHeader) {
    next(new AppError("Invalid credentials", 401));
  }
  const token = extractToken(authHeader);
  try {
    const decodePayload = jwt.verify(token, secretKey);
    const { id } = decodePayload;
    const user = await UserService.findById(id);
    if (!user) {
      next(new AppError("Invalid credentials", 401));
    }
  } catch (err) {
    next(err)
  }
};

const extractToken = (authHeader) => {
  if (authHeader.startsWith("Bearer")) {
    return authHeader.substring(7, authHeader.length - 1);
  }
};

module.exports = jwtFilterHandler;

// incoming request -> check whitelist url -> if in whitelist then can next, else stop them then extract
