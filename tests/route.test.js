const supertest = require("supertest");
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
  });

  test("get all available blogs", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(res.body).toHaveLength(initialBlogs.length);
  });
});
