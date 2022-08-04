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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
