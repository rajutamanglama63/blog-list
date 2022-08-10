const Blog = ({ blog, user }) => (
  <div>
    {/* {blog.title} {blog.author} */}
    <p>{user.name} logged in</p>

    <ul>
      {user.blogs.map((blog) => (
        <li key={blog.id}>blog</li>
      ))}
    </ul>
  </div>
);

export default Blog;
