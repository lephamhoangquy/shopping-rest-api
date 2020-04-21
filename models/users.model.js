const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid email address" });
      }
    },
  },
  password: {
    type: String,
    require: true,
  },
  name: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  refreshToken: String,
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified()) {
    user.password = await bcrypt.hash(user.password, 8);
    user.refreshToken = randToken.generate(80);
  }
  next();
});

userSchema.statics.findByCredentials = async (username, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return null;
  }
  return user;
};

userSchema.statics.generateAccessToken = async function (id) {
  // Generate an auth token for the user
  const accessToken = jwt.sign({ _id: id }, process.env.JWT_KEY, {
    expiresIn: "5m",
  });
  return accessToken; // don't have save accessToken in database
};

userSchema.statics.verfityRefreshToken = async function (id, token) {
  let user = await User.findOne({ _id: id });
  if (user && user.refreshToken === token) return true;
  return false;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
