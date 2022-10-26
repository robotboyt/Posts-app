import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCommentMedical } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./InsPage.css";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/Button/CustomButton";

const InsPage = ({ getData }) => {
  const state = useLocation();
  const { postId, postTitle, postDescription } = state.state;
  const navigate = useNavigate();

  const [title, setTitle] = useState(postTitle);
  const [description, setDescription] = useState(postDescription);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComment, setShowComments] = useState(false);
  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  //   From this function we get all Comments about this post
  const getComments = async () => {
    const response = await fetch(
      `https://bloggy-api.herokuapp.com/posts/${postId}?_embed=comments`
    );
    const data = await response.json();
    setComments(data.comments);
  };

  //   Here we use useEffect for get all comments.
  useEffect(() => {
    getComments();
    // Here I off eslint because i had some warning about useEffect deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   In this function we can to delete post
  const deletePost = () => {
    fetch(`https://bloggy-api.herokuapp.com/posts/${postId}`, {
      method: "DELETE",
    })
      .then(() => getData())
      .then(() => navigate("/"));
  };

  // In this function we can to change post
  const changePost = (e) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleInput,
        body: descriptionInput,
      }),
    };

    fetch(`https://bloggy-api.herokuapp.com/posts/${postId}`, requestOptions)
      .then((response) => response.json())
      .then(() => setTitle(titleInput))
      .then(() => setDescription(descriptionInput))
      .then(() => getData());
  };

  // This function create comments for this* post
  const createComment = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: postId,
        body: commentInput,
      }),
    };

    fetch("https://bloggy-api.herokuapp.com/comments", requestOptions)
      .then((response) => response.json())
      .then(() => getComments())
      .then(() => setCommentInput(""));
  };

  const toogleShow = (el) => {
    if (el === "commentIcon") {
      setShowComments(!showComment);
      setShowEdit(false);
      setShowDelete(false);
    } else if (el === "editIcon") {
      setShowEdit(!showEdit);
      setShowComments(false);
      setShowDelete(false);
    } else {
      setShowDelete(!showDelete);
      setShowComments(false);
      setShowEdit(false);
    }
  };

  return (
    <div className="ins-page">
      <div className="post-details">
        <h1>{title}</h1>
        <p>{description}</p>
        {showEdit ? (
          <div className="edit-block">
            <form
              className="form-edit-post"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="input-block">
                <CustomInput
                  value={titleInput}
                  setChange={setTitleInput}
                  placeholder={"Write new Title"}
                />
                <CustomInput
                  value={descriptionInput}
                  setChange={setDescriptionInput}
                  placeholder={"Write new Description"}
                />
              </div>
              <div className="btn-block">
                <CustomButton btnClass={"btnClose"} clickFunction={setShowEdit}>
                  Close
                </CustomButton>
                <CustomButton btnClass={"btnSubmit"} clickFunction={changePost}>
                  Change
                </CustomButton>
              </div>
            </form>
          </div>
        ) : null}
        {showComment ? (
          <div className="create-comment">
            <form
              className="comment-block"
              onSubmit={(e) => e.preventDefault()}
            >
              <CustomInput
                value={commentInput}
                setChange={setCommentInput}
                placeholder={"Write your comment"}
              />
              <div className="btn-block">
                <CustomButton
                  btnClass={"btnClose"}
                  clickFunction={setShowComments}
                >
                  Close
                </CustomButton>
                <CustomButton
                  btnClass={"btnSubmit"}
                  clickFunction={createComment}
                >
                  Post
                </CustomButton>
              </div>
            </form>
          </div>
        ) : null}
        {showDelete ? (
          <div className="btn-block">
            <CustomButton btnClass={"btnClose"} clickFunction={setShowDelete}>
              Close
            </CustomButton>
            <CustomButton btnClass={"btnDelete"} clickFunction={deletePost}>
              Delete
            </CustomButton>
          </div>
        ) : null}
        <div className="comments">
          <p>Comments:</p>
          {comments.length !== 0 ? (
            comments.map((comment) => (
              <div key={comment.id.toString()}>
                <br />
                <span>{comment.body}</span>
              </div>
            ))
          ) : (
            <span>No Comments</span>
          )}
        </div>
      </div>
      <div className="control">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="control-icon"
          onClick={() => toogleShow("editIcon")}
        />
        <FontAwesomeIcon
          icon={faCommentMedical}
          className="control-icon"
          onClick={() => toogleShow("commentIcon")}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="control-icon"
          onClick={() => toogleShow()}
        />
      </div>
    </div>
  );
};

export default InsPage;
