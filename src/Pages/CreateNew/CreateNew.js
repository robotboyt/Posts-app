import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button/CustomButton";
import CustomInput from "../../components/Input/CustomInput";
import "./CreateNew.css";

const CreateNew = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const createPost = () => {
    if (title.length >= 5 && description.length >= 5) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          body: description,
        }),
      };

      fetch("https://bloggy-api.herokuapp.com/posts", requestOptions)
        .then((response) => response.json())
        .then(() => navigate("/"));

      setTitle("");
      setDescription("");
    } else {
      alert("lot");
    }
  };

  return (
    <div className="create-page">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Create New Post</h2>
        <CustomInput
          value={title}
          setChange={setTitle}
          placeholder={"Post Title..."}
        />
        <CustomInput
          value={description}
          setChange={setDescription}
          placeholder={"Post Description..."}
        />
        <CustomButton btnClass={"btnSubmit"} clickFunction={createPost}>
          Submit
        </CustomButton>
      </form>
    </div>
  );
};

export default CreateNew;
