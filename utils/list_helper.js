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

module.exports = {
  dummy,
  totalLikes,
};
