import React, { useState } from "react";
import loginService from "../services/login";

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
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          password:{" "}
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
