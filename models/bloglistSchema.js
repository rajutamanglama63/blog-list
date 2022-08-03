const mongoose = require("mongoose");
const config = require("../utils/config");

const url = config.MONGO_URI;

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

bloglistSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

const Blogs = mongoose.model("blog", bloglistSchema);

module.exports = Blogs;
