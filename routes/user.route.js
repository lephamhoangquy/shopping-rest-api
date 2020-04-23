const express = require("express");
const { add } = require("../controllers/user.controller");
const vertify = require("../middlewares/auth.mdw");

const router = express.Router();

router.get("/me", vertify, (req, res) => {
  res.send(req.user);
});
router.post("/", add);

module.exports = router;
