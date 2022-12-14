const express = require("express");
const jwt = require("jsonwebtoken");
const Blog = require("../models/bloglistSchema");
const User = require("../models/userSchema");
const config = require("../utils/config");

const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res, next) => {
  // Blog.find({})
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

// GETTING TOKEN FOR AUTHORIZATION
// const getTokenFrom = (req, res) => {
//   const authorization = req.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     return authorization.substring(7);
//   }

//   return null;
// };

blogsRouter.post("/", async (req, res, next) => {
  try {
    if (req.body.likes === undefined) {
      req.body.likes = 0;
    }

    // const token = getTokenFrom(req);
    const decodedUser = jwt.verify(req.user, config.SECRET);

    console.log(decodedUser);
    if (!decodedUser.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    // const user = await User.findById(req.body.userId);
    const user = await User.findById(decodedUser.id);
    if (!user) {
      res.status(401).json({ error: "token missing or invalid" });
    }
    console.log(user);

    if (!(req.body.title && req.body.url)) {
      res.status(400).json({ error: " title and url are required" });
    } else {
      const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
        user: user.id,
      });

      const newBlog = await blog.save();
      user.blogs = user.blogs.concat(newBlog.id);
      // console.log(user.blogs);
      await user.save();

      res.status(200).json(newBlog);
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;

  const decodedUser = jwt.verify(req.user, config.SECRET);
  if (!decodedUser.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedUser.id);
  if (!user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const newBlogPost = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user.id,
  };

  const updatedBlogPost = await Blog.findByIdAndUpdate(id, newBlogPost, {
    new: true,
  });

  res.status(200).json(updatedBlogPost);

  next();
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);
  // console.log(blog.user.toString());

  const token = req.user;
  const decodedToken = jwt.verify(token, config.SECRET);
  console.log(decodedToken.id);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (blog.user.toString() === decodedToken.id) {
    console.log("should get deleted");
    blog.remove();
    res.status(200).json({ msg: "deleted" });
  } else {
    console.log("not deleted");
  }

  // const deletedBlogPost = await Blog.findByIdAndDelete(id);

  // res.status(204).json(deletedBlogPost);
});

module.exports = blogsRouter;
