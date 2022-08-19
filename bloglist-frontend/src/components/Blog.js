import { useState } from "react";
import blogServices from "../services/blogs";

const Blog = ({ blog, setMessage, setBlogs, blogs, user }) => {
  // console.log(user);
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
      const blogToBeUpdate = blogs.find((blg) => blg.id === id);
      // console.log(blogToBeUpdate);

      const newBlog = {
        likes: blog.likes + 1,
        author: blogToBeUpdate.author,
        title: blogToBeUpdate.title,
        url: blogToBeUpdate.url,
      };

      const response = await blogServices.updateBlog(id, newBlog);

      setBlogs(
        blogs.map((eachBlog) => (eachBlog.id === id ? response : eachBlog))
      );
    } catch (error) {
      // console.dir(error);

      setMessage(error.response.data.err);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const Delete = async (id) => {
    const blogToDelete = blogs.find((blg) => blg.id === id);
    const confirmed = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
    );

    if (confirmed) {
      await blogServices.deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }

    setMessage("Successfully deleted.");
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <>
      {!detail ? (
        <div className="blog" style={blogStyle}>
          {blog.title} {blog.author}{" "}
          <button className="show" onClick={toggleDetail}>
            view
          </button>
        </div>
      ) : (
        <>
          <div className="blog" style={blogStyle}>
            {blog.title} {blog.author}{" "}
            <button onClick={toggleDetail}>hide</button>
            <div className="url">{blog.url}</div>
            <div className="likes">
              likes:{blog.likes}{" "}
              <button onClick={() => Like(blog.id)}>like</button>
            </div>
            <div>{blog.user.username}</div>
            {user.name === blog.user.name ? (
              <button
                onClick={() => Delete(blog.id)}
                style={{ backgroundColor: "red" }}
              >
                delete
              </button>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Blog;
