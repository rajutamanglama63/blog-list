const mongoose = require("mongoose");

const bloglistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  likes: {
    type: Number,
  },
});

const Blogs = mongoose.model("blog", bloglistSchema);

module.exports = Blogs;
