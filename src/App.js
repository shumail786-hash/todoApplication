import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Not found Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1200}></ToastContainer>
    </div>
  );
};

export default App;
