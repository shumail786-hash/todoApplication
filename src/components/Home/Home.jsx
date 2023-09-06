import React from "react";
import "./Home.css";
import UploadTodo from "../UploadTodo/uploadTodo";
const Home = () => {
  return (
    <div className="app__container_background">
      <UploadTodo />
    </div>
  );
};

export default Home;
