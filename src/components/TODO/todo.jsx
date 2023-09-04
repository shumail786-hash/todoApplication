import React, { useState } from "react";
import "./todo.css";
import { toast } from "react-toastify";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo === "") {
      toast.error("Empty String Not Accepted");
    } else {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo__app">
      <input
        type="text"
        className="todo__input"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className="add__button" onClick={handleAddTodo}>
        Add
      </button>
      <ul className="todo__list">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}{" "}
            <button
              className="remove__button"
              onClick={() => handleRemoveTodo(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
