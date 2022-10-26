import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">All Posts</Link>
      <Link to="/create-new">Create New</Link>
    </div>
  );
};

export default Header;
