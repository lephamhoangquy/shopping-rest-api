const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const userModel = require("../models/users.model");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) {
        return res.status(401).send({ err });
      }
      const { _id } = payload;
      const user = await userModel.findById(_id);
      req.user = user;
      next();
    });
  } else {
    throw createError(401, "No access token found. ");
  }
};
