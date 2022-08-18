import React from "react";

const Notification = ({ message }) => {
  let msgStyle = "";
  if (message === null) {
    return null;
  }

  if (
    message === "User logged in successfully." ||
    message === "Successfully deleted."
  ) {
    msgStyle = "green";
  } else if (
    message === "Invalid credentials" ||
    message === "User does not exist." ||
    message === "jwt must be provided"
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
