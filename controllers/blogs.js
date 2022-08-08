const express = require("express");
const Blog = require("../models/bloglistSchema");
const User = require("../models/userSchema");

const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res, next) => {
  // Blog.find({})
  //   .populate("user", { username: 1, name: 1 })
  //   .then((blogs) => {
  //     res.status(200).json(blogs);
  //   })
  //   .catch((err) => next(err));

  try {
    const allBlogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });

    res.status(200).json(allBlogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (req, res, next) => {
  if (req.body.likes === undefined) {
    req.body.likes = 0;
  }

  const user = await User.findById(req.body.userId);

  if (!(req.body.title && req.body.url)) {
    res.status(400).end();
  } else {
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user._id,
    });

    try {
      const newBlog = await blog.save();
      user.blogs.concat(newBlog._id);
      await user.save();

      res.status(200).json(newBlog);
    } catch (error) {
      next(error);
    }
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;

  const newBlogPost = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  const updatedBlogPost = await Blog.findByIdAndUpdate(id, newBlogPost, {
    new: true,
  });

  res.status(200).json(updatedBlogPost);

  next();
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const deletedBlogPost = await Blog.findByIdAndDelete(id);

  res.status(204).json(deletedBlogPost);
});

module.exports = blogsRouter;
