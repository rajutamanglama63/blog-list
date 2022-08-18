import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState("");

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <button style={{ marginBottom: "10px" }} onClick={toggleVisibility}>
          {props.btnLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <button style={{ marginBottom: "10px" }} onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Toggleable;
