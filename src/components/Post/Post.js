import React from "react";
import "./Post.css";
import { useNavigate } from "react-router-dom";

const Post = ({ title, description, id }) => {
  const navigate = useNavigate();

  const toInsPage = () => {
    navigate("/ins", {
      state: {
        postId: id,
        postTitle: title,
        postDescription: description,
      },
    });
  };

  return (
    <div>
      <div className="post" onClick={() => toInsPage(id, title, description)}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Post;
