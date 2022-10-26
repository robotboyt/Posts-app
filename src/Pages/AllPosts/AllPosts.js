import React, { useEffect } from "react";
import Post from "../../components/Post/Post";
import "./AllPosts.css";
import loadAnim from "../../Assets/loading.gif";
import { useSelector, useDispatch } from "react-redux";
import { onLoading } from "../../features/slice";

const AllPosts = ({ data, getData }) => {
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    dispatch(onLoading());
    // Here I off eslint because i had some warning about useEffect deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="all-posts">
      {loading ? (
        <img style={{ marginTop: "100px" }} src={loadAnim} alt="loading" />
      ) : (
        data.map((post) => (
          <Post
            title={post.title}
            description={post.body}
            key={post.id.toString()}
            id={post.id}
            getData={getData}
          />
        ))
      )}
    </div>
  );
};

export default AllPosts;
