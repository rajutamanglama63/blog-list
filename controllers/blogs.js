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
  if (req.body.likes === undefined) {
    req.body.likes = 0;
  }

  if (!(req.body.title && req.body.url)) {
    res.status(400).end();
  } else {
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
    });
  }

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => next(err));
});

module.exports = blogsRouter;
