import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("logged in with ", username, password);
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
