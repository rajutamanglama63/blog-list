const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");

const Blogs = require("./models/bloglistSchema");
const User = require("./models/userSchema");

const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express();

app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unKnownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
