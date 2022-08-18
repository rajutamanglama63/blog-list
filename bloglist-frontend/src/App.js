import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loggoutHandler = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const sortedBlogs = blogs.sort((x, y) => y.likes - x.likes);
  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        // <Login setMessage={setMessage} setUser={setUser} />

        <Toggleable btnLabel="login">
          <Login setMessage={setMessage} setUser={setUser} />
        </Toggleable>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{" "}
            <button onClick={loggoutHandler}>logout</button>{" "}
          </p>

          <Toggleable btnLabel="new blog" ref={blogFormRef}>
            <CreateBlog
              setMessage={setMessage}
              setBlogs={setBlogs}
              blogs={blogs}
              blogFormRef={blogFormRef}
            />
          </Toggleable>
          {/* <Blog blogs={blogs} /> */}
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              setMessage={setMessage}
              setBlogs={setBlogs}
              blogs={blogs}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
