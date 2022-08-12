import React, { useState } from "react";
import createService from "../services/createBlog";

const CreateBlog = ({ setMessage, setBlogs, blogs }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    userId: "",
  });

  const createBlogHandler = async (e) => {
    e.preventDefault();
    // console.log(
    //   "newly created blog is ",
    //   newBlog.title,
    //   newBlog.author,
    //   newBlog.url
    // );

    try {
      const newlyCreatedBlog = await createService.createBlog(newBlog);

      console.log(newlyCreatedBlog);

      setBlogs([...blogs, newlyCreatedBlog]);
    } catch (error) {
      console.dir(error);
      // setMessage(error.response.data.err);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
    }
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
        <p>
          userId:{" "}
          <input
            type="text"
            value={newBlog.userId}
            onChange={(e) => setNewBlog({ ...newBlog, userId: e.target.value })}
          />{" "}
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
