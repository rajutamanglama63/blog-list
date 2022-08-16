import { useState } from "react";

const Blog = ({ blog }) => {
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
            {/* <button onClick={() => increaseLike(blog.id)}>like</button> */}
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </>
  );
};

export default Blog;
