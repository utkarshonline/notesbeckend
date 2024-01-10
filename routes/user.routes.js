const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
userRouter.post("/register", (req, res) => {
  const { username, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 2, async (err, hash) => {
      if (err) {
        res.status(200).json({ error: err });
      } else {
        const user = new UserModel({ username, email, pass: hash });
        await user.save();
        res.status(200).json({ msg: "The new user has been registered" });
      }
    });
  } catch {
    res.status(400).json({ error: err });
  }
});

// ** userlogin

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user._id, username: user.username },
          "masai"
        );
        res.status(200).json({ msg: "logged in", token });
      } else {
        res.status(200).json({ error: err });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = {
  userRouter,
};
