import React, { useState } from "react";

const CreateBlog = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const createBlogHandler = (e) => {
    e.preventDefault();
    // console.log(
    //   "newly created blog is ",
    //   newBlog.title,
    //   newBlog.author,
    //   newBlog.url
    // );
  };

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={createBlogHandler}>
        <p>
          title:{" "}
          <input
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />{" "}
        </p>
        <p>
          author:{" "}
          <input
            type="text"
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />{" "}
        </p>
        <p>
          url:{" "}
          <input
            type="text"
            value={newBlog.url}
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />{" "}
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
