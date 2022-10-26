import React from "react";
import "./CustomInput.css";

const CustomInput = ({ value, placeholder, setChange }) => {
  return (
    <input
      className="custom-input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setChange(e.target.value)}
    />
  );
};

export default CustomInput;
