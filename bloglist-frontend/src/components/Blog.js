import { useState } from "react";

const Blog = ({ blogs }) => {
  const [detail, setDetail] = useState(false);

  const toggleDetail = () => {
    setDetail(!detail);
  };

  return (
    <div>
      {/* {blog.title} {blog.author} */}

      {/* <ul>
        {blogs.map((blog) => (
          <li key={blog.id} style={{ listStyle: "none", marginLeft: 0 }}>
            {blog.title} {blog.author}
          </li>
        ))}
      </ul> */}

      {blogs.map((blog) => (
        <p key={blog.id}>
          {blog.title} {blog.author}
          <button onClick={toggleDetail}>{!detail ? "view" : "hide"}</button>
        </p>
      ))}
    </div>
  );
};

export default Blog;
