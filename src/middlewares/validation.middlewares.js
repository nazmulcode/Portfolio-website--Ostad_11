import authConfigs from "../config/auth.config.js";

export const validateUser = (req, res, next) => {
  const token = req.cookies["user-token"];
  const decode = authConfigs.decodeToken(token);

  if (!decode === null) {
    return res.status(401).json({
      message: "Please login first",
    });
  } else {
    req.headers.email = decode["email"];
    req.headers._id = decode["id"];
    next();
  }
};
