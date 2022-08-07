const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/bloglistSchema");

const api = supertest(app);

const initialBlogs = [
  {
    author: "Raju",
    blog: 6,
    likes: 89,
    title: "science",
  },
  {
    author: "Sudesh",
    blog: 6,
    likes: 89,
    title: "Grammer",
  },
];

describe("routing test", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();

    // ANOTHER METHOD
    // const blogsObject = initialBlogs.map((eachBlog) => new Blog(eachBlog));
    // const promiseArr = blogsObject.map((eachBlog) => eachBlog.save());
    // await Promise.all(promiseArr);
  });

  test("get all available blogs", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(res.body).toHaveLength(initialBlogs.length);
  });

  test("verify the unique identifier", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(res.body[0].id).toBeDefined();
  });

  test("create new post", async () => {
    const newBlog = {
      author: "Jonaa",
      blog: 9,
      likes: 98,
      title: "Environment",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("api/blogs");
    const blogTitle = res.body.map((eachBlog) => eachBlog.title);

    expect(res.body).toHaveLength(initialBlogs.length + 1);

    expect(blogTitle).toContain("Environment");
  });
});
