const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogspostlist) => {
  // VANILLA APPROACH
  //   let numOfLikes = 0;
  //   for (let i = 0; i < blogspostlist.length; i++) {
  //     numOfLikes += blogspostlist[i].likes;
  //   }

  //   return numOfLikes;

  // ADVANCE APPROACH
  return blogspostlist.reduce((a, b) => {
    let totalNumOfLikes = a + b.likes;
    return totalNumOfLikes;
  }, 0);
};

const favoriteBlog = (blogslist) => {
  let max = 0;
  for (let i = 0; i < blogslist.length; i++) {
    if (blogslist[i].likes > max) {
      max = blogslist[i].likes;
    }
  }

  // console.log(max)
  const myObj = blogslist.find((a) => {
    // console.log(a.likes)
    return a.likes === max;
  });
  //   console.log(myObj)

  return myObj;
};

const mostBlogs = (arrOfBlogs) => {
  let maxBlog = 0;
  for (let i = 0; i < arrOfBlogs.length; i++) {
    if (arrOfBlogs[i].blog > maxBlog) {
      maxBlog = arrOfBlogs[i].blog;
    }
  }

  const objWithMostBlog = arrOfBlogs.find((x) => {
    return x.blog === maxBlog;
  });

  return objWithMostBlog;
};

const mostLikes = (arrOfBlogs) => {
  let maxLikes = 0;
  for (let i = 0; i < arrOfBlogs.length; i++) {
    if (arrOfBlogs[i].likes > maxLikes) {
      maxLikes = arrOfBlogs[i].likes;
    }
  }

  const objWithMostBlog = arrOfBlogs.find((x) => {
    return x.likes === maxLikes;
  });

  return objWithMostBlog;
};

// USER TEST

const User = require("../models/userSchema");

const userInDB = async () => {
  const allUsersInDB = await User.find();

  const user = allUsersInDB.map((individualUser) => individualUser.toJSON());

  return user;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  userInDB,
};
