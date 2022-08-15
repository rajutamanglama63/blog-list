import React, { useState } from "react";

const Toggleable = (props) => {
  const [visible, setVisible] = useState("");

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.btnLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default Toggleable;
