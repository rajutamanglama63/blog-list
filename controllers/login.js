const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../utils/config");
const User = require("../models/userSchema");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userExist = await User.findOne({ username });

    if (!userExist) {
      res.status(400).json("User does not exist.");
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      res.status(401).json("Invalid credentials");
    }

    const userForToken = {
      username: userExist.username,
      id: userExist._id,
    };

    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });

    res.status(200).json({
      token,
      username: userExist.username,
      name: userExist.name,
      blogs: userExist.blogs,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
