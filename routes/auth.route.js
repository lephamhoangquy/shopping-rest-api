const express = require("express");
const { login, refreshToken } = require("../controllers/auth.controller");

const router = express.Router();

// login
router.post("/", login);

// refresh token
router.post("/refresh", refreshToken);

module.exports = router;
