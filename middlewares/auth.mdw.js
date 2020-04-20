const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) throw createError(401, err);
      req.tokenPayload = payload;
      next();
    });
  } else {
    throw createError(401, "No access token found. ");
  }
};
