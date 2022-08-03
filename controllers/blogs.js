const express = require("express");
const Blog = require("../models/bloglistSchema");

const blogsRouter = express.Router();

blogsRouter.get("/", (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.status(200).json(blogs);
    })
    .catch((err) => next(err));
});

blogsRouter.post("/", (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    likes: req.body.likes,
  });

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => next(err));
});

module.exports = blogsRouter;
