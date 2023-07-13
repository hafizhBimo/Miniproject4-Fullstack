const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const crypto = require("crypto");
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      //validate user email
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(404).send({
          message: "login failed, user not found",
        });
      }
      //validate password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).send({
          message: "login failed, incorrect password",
        });
      }

      //generate token
      const payload = { id: user.id, role_id: user.role_id };
      const token = jwt.sign(payload, secretKey);

      res.status(200).send({
        message: "login success",
        data: user.email,
        loginToken: token,
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
};
