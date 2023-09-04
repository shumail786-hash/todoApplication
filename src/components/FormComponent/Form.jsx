import React, { useState, useEffect } from "react";
import "./form.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  //Getting Name Value
  const getUserValue = (e) => {
    setName(e.target.value);
  };

  // Posting User Name to LocalStorage
  const postUserName = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    toast.success(`Name ${name} Post Successfully`);
    setName("");
    navigate("/main");
  };
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      navigate("/main");
    }
  }, [navigate]);
  return (
    <div className="form__container">
      <div className="form">
        <h1>Hy Stranger👋</h1>
        <form onSubmit={postUserName}>
          <input
            type="text"
            name="userName"
            value={name}
            onChange={getUserValue}
            placeholder="Your Good Name"
            autoComplete="off"
            required
          />
          <button type="submit">Post Now</button>
        </form>
        <p className="user__note">
          <b>Note:</b>
          <span className="user__note_para">
            {" "}
            It is mandatory to enter your name.{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Form;
