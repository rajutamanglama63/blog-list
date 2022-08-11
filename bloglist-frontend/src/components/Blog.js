const Blog = ({ blogs, user }) => (
  <div>
    {/* {blog.title} {blog.author} */}
    <p>{user.name} logged in</p>

    {/* <ul>
      {user.blogs.map((blog) => (
        <li key={blog.id}>blog</li>
      ))}
    </ul> */}

    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </ul>
  </div>
);

export default Blog;
