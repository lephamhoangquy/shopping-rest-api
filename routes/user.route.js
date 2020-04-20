const express = require("express");
const { add } = require("../controllers/user.controller");

const router = express.Router();

router.post("/", add);

module.exports = router;
