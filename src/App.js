import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AllPosts from "./Pages/AllPosts/AllPosts";
import CreateNew from "./Pages/CreateNew/CreateNew";
import InsPage from "./Pages/InsPage/InsPage";
import { useDispatch } from "react-redux";
import { offLoading } from "./features/slice";

function App() {
  const [postsData, setPostsData] = useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    const response = await fetch("https://bloggy-api.herokuapp.com/posts");
    const data = await response.json();
    setPostsData(data);
    dispatch(offLoading());
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<AllPosts data={postsData} getData={getData} />}
        />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/ins" element={<InsPage getData={getData} />} />
        <Route path="*" element={"ERROR PAGE"} />
      </Routes>
    </div>
  );
}

export default App;
