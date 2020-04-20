const userModel = require("../models/users.model");

module.exports = {
  add: async (req, res) => {
    const user = new userModel(req.body);
    const ret = await user.save();
    res.status(201).json(ret);
  },
};
