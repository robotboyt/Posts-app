import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AllPosts from "./Pages/AllPosts/AllPosts";
import CreateNew from "./Pages/CreateNew/CreateNew";
import InsPage from "./Pages/InsPage/InsPage";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch("https://bloggy-api.herokuapp.com/posts");
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <AllPosts
              data={data}
              getData={getData}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/ins" element={<InsPage getData={getData} />} />
        <Route path="*" element={"ERROR PAGE"} />
      </Routes>
    </div>
  );
}

export default App;
