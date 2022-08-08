const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/bloglistSchema");

const api = supertest(app);

const initialBlogs = [
  {
    author: "Raju",
    url: "6.com",
    likes: 89,
    title: "science",
  },
  {
    author: "Sudesh",
    url: "6.com",
    likes: 9,
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
  }, 1000 * 50);

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

    const res = await api.get("/api/blogs");
    const blogTitle = res.body.map((eachBlog) => eachBlog.title);

    expect(res.body).toHaveLength(initialBlogs.length + 1);

    expect(blogTitle).toContain("Environment");
  });

  test("if likes prop is missing, assign it to zero", async () => {
    const blog = {
      author: "Jonaa",
      blog: 9,
      title: "Environment",
    };
    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const res = await api.get("/api/blogs");

    const likes = res.body.map((eachBlog) => eachBlog.likes);

    expect(likes).toContain(0);
  });

  test("verify the title and url prop, if not verified respond with 400 bad request", async () => {
    const newBlog = {
      author: "Jonathan",
      blog: 4,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test.only("delete a single blog post", async () => {
    const blog = await Blog.find({ title: "science" });
    console.log(blog);
    await api.delete(`/api/blogs/${blog[0].id}`).expect(204);

    const existingBlogs = await Blog.find();

    const existingBlogsTitle = existingBlogs.map((blog) => blog.title);

    expect(existingBlogsTitle).not.toContain("science");
  }, 10000);

  test("update the info of an individual blog post", async () => {
    const individualBlog = await Blog.find({ title: "Grammer" });
    // console.log(individualBlog);
    const data = {
      title: individualBlog[0].title,
      author: individualBlog[0].author,
      url: individualBlog[0].url,
      likes: 70,
    };
    await api.put(`/api/blogs/${individualBlog[0].id}`).send(data).expect(200);

    const updatedBlog = await Blog.find({ title: "Grammer" });

    expect(updatedBlog[0].likes).toBe(70);
  });
});
