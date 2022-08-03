const mongoose = require("mongoose");
const config = require("../utils/config");

const url = config.MONGO_URI;

console.log("MongoDB connection in process...");

mongoose
  .connect(url)
  .then((result) => {
    console.log("MongoDB connection established.");
  })
  .catch((err) => {
    console.log("err connecting to MongoDB:", err.message);
  });

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
