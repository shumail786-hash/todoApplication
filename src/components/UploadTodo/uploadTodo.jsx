import React, { useState, useEffect } from "react";
import "./UploadTodo.css";
import { toast } from "react-toastify";

const UploadTodo = () => {
  const [inputValue, setinputValue] = useState("");
  const [sortTodo, setSortTodo] = useState([]);
  const [currentDay, setCurrentDay] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  //   Checking whether data is stored in Local Storage or not. If yes
  // then parse the data otherwise return the empty array.

  const [submitTodo, setSubmitTodo] = useState(() => {
    const storedTodo = JSON.parse(localStorage.getItem("todo")) || [];
    return storedTodo;
  });
  const [statusOfTodo, setStatusOfTodo] = useState(false);

  // checking length of incomplete tasks
  const [length, setLength] = useState(Number);
  const [completeLength, setCompletedLength] = useState(Number);

  // Editing the li

  const [editType, setEditType] = useState(false);
  const [editedText, setEditedText] = useState("");

  const submitValueToLocalStorage = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      toast.error("Empty Value is not Accepted");
    } else {
      const postValue = {
        id: Date.now(),
        value: inputValue,
        statusOfTodo,
        editType,
      };
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

  const checkCompleteLengthHandler = () => {
    const checkLength = submitTodo.filter(
      (element) => element.statusOfTodo === true
    );
    if (checkLength.length === 0) {
      setCompletedLength(0);
    } else {
      setCompletedLength(checkLength);
    }
  };
  // console.log(length.length);

  useEffect(() => {
    const getDataFromLocalStorage = JSON.parse(localStorage.getItem("todo"));
    if (getDataFromLocalStorage) {
      const arrayOfData = Object.values(getDataFromLocalStorage);
      // I didn't sort it.
      // arrayOfData.sort((a, b) => b.id - a.id);
      setSortTodo(arrayOfData);
    }

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = currentDate.getDate();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = currentDate.toLocaleString("default", { month: "long" });
    // Getting Local Time

    // Formatting the time data as "Month, Day Date"
    const formattedDate = `${dayOfWeek} ${month}, ${date}`;
    setCurrentDay(formattedDate);
    // Formatting hours and minutes

    checkLengthHandler();
    checkCompleteLengthHandler();

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [submitTodo, statusOfTodo, editType]);
  // console.log(sortTodo, "I'm after");
  //   console.log(submitTodo);

  // Remove Button Function

  const handleRemoveList = (id) => {
    const filterTodo = submitTodo.filter((item) => item.id !== id);
    setSubmitTodo(filterTodo);
    toast.info("Task Deleted Successfully");
    localStorage.setItem("todo", JSON.stringify(filterTodo));
    // console.log(filterTodo);
  };

  const editTogglerMode = (id) => {
    const updatedTodo = submitTodo.map((item) =>
      item.id === id ? { ...item, editType: !item.editType } : item
    );
    setSubmitTodo(updatedTodo);
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
  };
  const handleEditList = (id) => {
    const filterTodo = submitTodo.map((element) =>
      element.id === id
        ? {
            ...element,
            value: editedText,
            editType: !element.editType,
            statusOfTodo: false,
          }
        : element
    );
    setEditedText("");
    setSubmitTodo(filterTodo);
    toast.success("Saved Successfully");
    localStorage.setItem("todo", JSON.stringify(filterTodo));
  };
  const handleStatusofTodo = (id) => {
    const updatedTodo = submitTodo.map((item) =>
      item.id === id ? { ...item, statusOfTodo: !item.statusOfTodo } : item
    );
    setSubmitTodo(updatedTodo);
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
  };

  const clearCompletedTasks = () => {
    const hasCompleted = submitTodo.some(
      (element) => element.statusOfTodo === true
    );
    if (hasCompleted) {
      const filterTodo = submitTodo.filter((element) => !element.statusOfTodo);
      setSubmitTodo(filterTodo);
      toast.success("Completed Tasks have cleared");
      localStorage.setItem("todo", JSON.stringify(filterTodo));
    } else {
      toast.error("No Completed Task Found");
    }
  };
  return (
    <>
      <form action="submit" onSubmit={submitValueToLocalStorage}>
        <div className="app__content">
          <div className="app__content_system_time">
            <div className="app__content_day_date">
              <p>{currentDay}</p>
              {length.length === undefined ? (
                <li>0 Active Task.</li>
              ) : (
                <li>{length.length} Active Task.</li>
              )}
            </div>
            <div className="app__content_time">
              <p>
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
              {completeLength.length === undefined ? (
                <li>0 Completed Tasks </li>
              ) : (
                <li> {completeLength.length} Completed Tasks </li>
              )}
            </div>
          </div>
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
                    {element.editType ? (
                      <>
                        <input
                          type="text"
                          placeholder="Edit"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="app__lists_li"
                        />
                        <button
                          className="app__lists_li_edit app__lists_li_save"
                          onClick={() => handleEditList(element.id)}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
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
                        {element.statusOfTodo === true ? (
                          <></>
                        ) : (
                          <button
                            className="app__lists_li_edit"
                            onClick={() => editTogglerMode(element.id)}
                          >
                            Update
                          </button>
                        )}
                        <button
                          className="app__lists_li_del"
                          onClick={() => handleRemoveList(element.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="app__list_empty">
                <h1>No Tasks Found </h1>
              </div>
            )}
          </ul>
        </div>

        <div className="app__options_tasks_status">
          <li onClick={clearCompletedTasks}>Clear Complete</li>
        </div>
      </div>
    </>
  );
};

export default UploadTodo;
