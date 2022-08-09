const mongoose = require("mongoose");
const config = require("../utils/config");

const url = config.MONGO_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("MongoDB connection established");
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

bloglistSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blogs = mongoose.model("blog", bloglistSchema);

module.exports = Blogs;
