const userModel = require("../models/users.model");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findByCredentials(username, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login faild! Check authentication credentials" });
    }
    const accessToken = await user.generateAccessToken();
    res.json({
      accessToken,
    });
  },
};
