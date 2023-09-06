import React, { useState, useEffect } from "react";
import "./UploadTodo.css";
import { toast } from "react-toastify";

const UploadTodo = () => {
  const [inputValue, setinputValue] = useState("");
  const [sortTodo, setSortTodo] = useState([]);

  //   Checking whether data is stored in Local Storage or not. If yes
  // then parse the data otherwise return the empty array.

  const [submitTodo, setSubmitTodo] = useState(() => {
    const storedTodo = JSON.parse(localStorage.getItem("todo")) || [];
    return storedTodo;
  });

  const submitValueToLocalStorage = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      toast.error("Empty Value is not Accepted");
    } else {
      const postValue = { id: Date.now(), value: inputValue };
      setSubmitTodo((previousTodo) => [...previousTodo, postValue]);
      setinputValue("");

      //   Store now in Local Storage

      localStorage.setItem("todo", JSON.stringify([...submitTodo, postValue]));
    }
  };
  useEffect(() => {
    const getDataFromLocalStorage = JSON.parse(localStorage.getItem("todo"));
    if (getDataFromLocalStorage) {
      const arrayOfData = Object.values(getDataFromLocalStorage);
      arrayOfData.sort((a, b) => b.id - a.id);
      setSortTodo(arrayOfData);
    }
  }, [submitTodo]);
  // console.log(sortTodo, "I'm after");
  //   console.log(submitTodo);

  // Remove Button Function

  const handleRemoveList = (id) => {
    const filterTodo = submitTodo.filter((item) => item.id !== id);
    setSubmitTodo(filterTodo);
    localStorage.setItem("todo", JSON.stringify(filterTodo));
    console.log(filterTodo);
  };

  return (
    <>
      <form action="submit" onSubmit={submitValueToLocalStorage}>
        <div className="app__content">
          <h1>Your Todo List:</h1>
          <div className="app__input">
            <input
              type="text"
              placeholder="Write your Task"
              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
      <div className="app__get_container">
        <div className="app__lists">
          <ul className="app__lists_ul">
            {sortTodo.length ? (
              <>
                {sortTodo.map((element, index) => (
                  <div className="app__lists_li_btn" key={index}>
                    <li className="app__lists_li">
                      {index + 1}. {element.value}
                    </li>
                    <button
                      className="app__lists_li_del"
                      onClick={() => handleRemoveList(element.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <div className="app__list_empty">
                <h1>🥸 No Data Found 🤪</h1>
              </div>
            )}
          </ul>
        </div>
        <div className="app__options">
          <div className="app__options_index">
            <li>{sortTodo.length} Task(s) Left.</li>
          </div>
          <div className="app__options_status">
            <li>All</li>
            <li>Active</li>
            <li>Completed</li>
          </div>
          <div className="app__options_tasks_status">
            <li>Clear Complete</li>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadTodo;
