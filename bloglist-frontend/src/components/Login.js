import React, { useState } from "react";
import loginService from "../services/login";
import createService from "../services/createBlog";

const Login = ({ setMessage, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log("logged in with ", username, password);

    try {
      const responsedUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(responsedUser)
      );
      // createService.setToken(responsedUser.token);
      // console.log(responsedUser);
      setUser(responsedUser);
      setMessage("User logged in successfully.");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setUsername("");
      setPassword("");
    } catch (error) {
      // console.dir(error);
      setMessage(error.response.data);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <h1>Log in to application</h1>

      <form onSubmit={onSubmitHandler}>
        <p>
          username:{" "}
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          password:{" "}
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
