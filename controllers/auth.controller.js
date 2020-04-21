const userModel = require("../models/users.model");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findByCredentials(username, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login faild! Check authentication credentials" });
    }
    const accessToken = await userModel.generateAccessToken(user._id);
    res.json({
      accessToken,
      refreshToken: user.refreshToken,
    });
  },

  refreshToken: async (req, res) => {
    const { accessToken, refreshToken } = req.body;
    jwt.verify(
      accessToken,
      process.env.JWT_KEY,
      { ignoreExpiration: true },
      async (err, payload) => {
        if (err)
          return res.status(400).json({ error: "Invalid access token. " });
        const { _id } = payload;
        const ret = await userModel.verfityRefreshToken(_id, refreshToken);
        if (ret === false) {
          res.status(400).json({ error: "Invalid refresh token. " });
        }
        let newAccessToken = await userModel.generateAccessToken(_id);
        return res.json({ accessToken: newAccessToken });
      }
    );
  },
};
