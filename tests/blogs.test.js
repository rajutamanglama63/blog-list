const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has multiple blog, return total likes of all blog object", () => {
    const listwithMultipleBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },

      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 15,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(listwithMultipleBlog);
    expect(result).toBe(20);
  });

  test("show most liked blog as favorite blog", () => {
    const blogslist = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },

      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Science & Technology",
        author: "Raju Lama",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 15,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(blogslist);
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Science & Technology",
      author: "Raju Lama",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
      __v: 0,
    });
  });

  test("return author with most blog", () => {
    const arrOfBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        blog: 2,
        likes: 5,
        __v: 0,
      },

      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Science & Technology",
        author: "Raju Lama",
        blog: 8,
        likes: 15,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(arrOfBlogs);
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Science & Technology",
      author: "Raju Lama",
      blog: 8,
      likes: 15,
      __v: 0,
    });
  });
});
