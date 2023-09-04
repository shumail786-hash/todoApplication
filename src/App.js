import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/homeComponent/Home";
import Form from "./components/FormComponent/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/main" element={<Home />} />
          {/* Not found Route */}
          <Route path="*" element={<Form />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1200}></ToastContainer>
    </div>
  );
};

export default App;
