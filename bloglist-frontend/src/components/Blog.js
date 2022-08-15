const Blog = ({ blogs }) => (
  <div>
    {/* {blog.title} {blog.author} */}

    <ul>
      {blogs.map((blog) => (
        <li key={blog.id} style={{ listStyle: "none" }}>
          {blog.title} {blog.author}
        </li>
      ))}
    </ul>
  </div>
);

export default Blog;
