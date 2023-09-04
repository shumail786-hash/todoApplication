import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Todo from "../TODO/todo";
const Home = () => {
  const navigate = useNavigate();

  const [currentDay, setCurrentDay] = useState("");
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    // Getting Days
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
    const month = currentDate.toLocaleString("default", { month: "long" });
    const date = currentDate.getDate();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    // Formatting the time data as "Month, Day Date"
    const formattedData = `${dayOfWeek}, ${month} ${date}`;
    setCurrentDay(formattedData);

    // Getting User State from Local Storage
    const storedUser = localStorage.getItem("userName");
    setActiveUser(storedUser);
  }, []);
  const resetNameOfUser = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="main__container">
      <div className="main">
        <div className="user__greetings_section">
          <div className="user__greetings">
            {activeUser ? (
              <h1 className="user_heading">Hy {activeUser}👋</h1>
            ) : (
              <>{navigate("/")}</>
            )}
            <p>It's {currentDay}.</p>
          </div>
        </div>
        {/* User Greetings Section Ended */}
        <Todo />
        <button className="name__reset" onClick={resetNameOfUser}>
          Reset Name
        </button>
      </div>
    </div>
  );
};

export default Home;
