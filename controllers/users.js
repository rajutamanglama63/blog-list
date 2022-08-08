const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  const { name, username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({ msg: "All fields are required." });
    }

    if (username.length < 3 || password.length < 3) {
      res.status(400).json({
        msg: "Username and password should be atleast 3 character long.",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(400).json({ msg: "Username must be unique." });
    }
    const salt = await bcrypt.genSalt(10);

    const hassedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      password: hassedPassword,
    });

    newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
