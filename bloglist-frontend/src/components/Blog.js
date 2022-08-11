const Blog = ({ blogs, user }) => (
  <div>
    {/* {blog.title} {blog.author} */}
    <p>{user.name} logged in</p>

    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          {blog.title} {blog.author}
        </li>
      ))}
    </ul>
  </div>
);

export default Blog;
