import React from "react";
import "./CustomButton.css";

const CustomButton = ({ children, btnClass, clickFunction }) => {
  return (
    // FIX THIS FUNCTION HE DOESN'T WORK GOOD
    <button className={btnClass} onClick={() => clickFunction()}>
      {children}
    </button>
  );
};

export default CustomButton;
