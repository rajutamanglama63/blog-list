import React, { useState } from "react";
import createService from "../services/createBlog";

const CreateBlog = ({ setMessage, setBlogs, blogs, blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
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
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.dir(error);
      // setMessage(error.response.data.err);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
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
            id="title"
            placeholder="title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />{" "}
        </p>
        <p>
          author:{" "}
          <input
            type="text"
            id="author"
            placeholder="author"
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />{" "}
        </p>
        <p>
          url:{" "}
          <input
            type="text"
            id="url"
            placeholder="url"
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
