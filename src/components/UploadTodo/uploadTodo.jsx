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
  const [statusOfTodo, setStatusOfTodo] = useState(false);

  // checking length of incomplete tasks
  const [length, setLength] = useState(Number);
  const submitValueToLocalStorage = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      toast.error("Empty Value is not Accepted");
    } else {
      const postValue = { id: Date.now(), value: inputValue, statusOfTodo };
      setSubmitTodo((previousTodo) => [...previousTodo, postValue]);
      setinputValue("");
      //   Store now in Local Storage

      localStorage.setItem("todo", JSON.stringify([...submitTodo, postValue]));
    }
  };
  const checkLengthHandler = () => {
    const checkLength = submitTodo.filter(
      (element) => element.statusOfTodo === false
    );
    if (checkLength.length === 0) {
      setLength(0);
    } else {
      setLength(checkLength);
    }
  };
  // console.log(length.length);

  useEffect(() => {
    const getDataFromLocalStorage = JSON.parse(localStorage.getItem("todo"));
    if (getDataFromLocalStorage) {
      const arrayOfData = Object.values(getDataFromLocalStorage);
      arrayOfData.sort((a, b) => b.id - a.id);
      setSortTodo(arrayOfData);
    }

    checkLengthHandler();
  }, [submitTodo, statusOfTodo]);
  // console.log(sortTodo, "I'm after");
  //   console.log(submitTodo);

  // Remove Button Function

  const handleRemoveList = (id) => {
    const filterTodo = submitTodo.filter((item) => item.id !== id);
    setSubmitTodo(filterTodo);
    localStorage.setItem("todo", JSON.stringify(filterTodo));
    // console.log(filterTodo);
  };
  const handleStatusofTodo = (id) => {
    const updatedTodo = submitTodo.map((item) =>
      item.id === id ? { ...item, statusOfTodo: !item.statusOfTodo } : item
    );
    setSubmitTodo(updatedTodo);
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
  };

  const clearCompletedTasks = () => {
    const filterTodo = submitTodo.filter((element) => !element.statusOfTodo);
    // console.log(filterTodo);
    setSubmitTodo(filterTodo);
    localStorage.setItem("todo", JSON.stringify(filterTodo));
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
                    <li
                      className={`${
                        element.statusOfTodo === false
                          ? "app__lists_li"
                          : "app__lists_li disabledLi"
                      }`}
                      onClick={() => handleStatusofTodo(element.id)}
                    >
                      {index + 1}. {element.value}
                      {"  "}
                      {element.statusOfTodo === true ? (
                        <span className="app__status_completed">
                          {" "}
                          (Completed)
                        </span>
                      ) : (
                        <></>
                      )}
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
                <h1>🥸 No Tasks Found 🤪</h1>
              </div>
            )}
          </ul>
        </div>
        <div className="app__options">
          <div className="app__options_index">
            {length.length === undefined ? (
              <li>0 Task Left.</li>
            ) : (
              <li>{length.length} Task(s) Left.</li>
            )}
          </div>

          <div className="app__options_tasks_status">
            <li onClick={clearCompletedTasks}>Clear Complete</li>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadTodo;
