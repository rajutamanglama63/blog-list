import React from "react";

const Notification = ({ message }) => {
  let msgStyle = "";
  if (message === null) {
    return null;
  }

  if (message === "User logged in successfully.") {
    msgStyle = "green";
  } else if (
    message === "Invalid credentials" ||
    message === "User does not exist."
  ) {
    msgStyle = "red";
  }
  return (
    <div>
      <p className={msgStyle}>{message}</p>
    </div>
  );
};

export default Notification;
