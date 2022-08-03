const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");

const Blogs = require("./models/bloglistSchema");

const blogsRouter = require("./controllers/blogs");

const app = express();

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unKnownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
