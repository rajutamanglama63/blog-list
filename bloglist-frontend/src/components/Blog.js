import { useState } from "react";
import blogServices from "../services/blogs";

const Blog = ({ blog, setMessage, setBlogs, blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [detail, setDetail] = useState(false);

  const toggleDetail = () => {
    setDetail(!detail);
  };

  const Like = async (id) => {
    try {
      const blogToBeUpdate = blog.id;

      const newBlog = {
        likes: blogToBeUpdate.likes + 1,
        author: blogToBeUpdate.author,
        title: blogToBeUpdate.title,
        url: blogToBeUpdate.url,
      };

      const response = await blogServices.updateBlog(id, newBlog);

      setBlogs(
        blogs.map((eachBlog) => (eachBlog.id === id ? response : eachBlog))
      );
    } catch (error) {
      // console.log(error)

      setMessage(error.response.data.error);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <>
      {!detail ? (
        <div style={blogStyle}>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleDetail}>view</button>
        </div>
      ) : (
        <div style={blogStyle}>
          {blog.title} <button onClick={toggleDetail}>hide</button>
          <div>{blog.url}</div>
          <div>
            likes:{blog.likes}{" "}
            <button onClick={() => Like(blog.id)}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </>
  );
};

export default Blog;
