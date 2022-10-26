import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./AllPosts.css";
import loadAnim from "../../Assets/loading.gif";

const AllPosts = ({ data, getData, loading, setLoading }) => {
  useEffect(() => {
    setLoading(true);
    getData();
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
