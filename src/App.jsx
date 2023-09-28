import React, { useState } from "react";
import TodoTable from "./TodoTable"; 

function App() {
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    const { name, value } = event.target;
    if (name === "desc") {
      setDesc(value);
    } else if (name === "date") {
      setDate(value);
    }
  };

  const addTodo = (event) => {
    event.preventDefault();
    const newTodo = { description: desc, date: date };
    setTodos([...todos, newTodo]);
    setDesc("");
    setDate("");
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  const clearTodos = () => {
    setTodos([]);
  };

  return (
    <div className="content-container">
      <h1 style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
        Todo List
      </h1>
      <div className="input-area">
        <input
          type="text"
          name="desc"
          onChange={inputChanged}
          value={desc}
          placeholder="Description"
          style={{ marginRight: "10px", height: "30px" }}
        />
        <input
          type="text"
          name="date"
          onChange={inputChanged}
          value={date}
          placeholder="Date"
          style={{ marginLeft: "10px", height: "30px" }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <TodoTable todos={todos} onDelete={deleteTodo} clearTodos={clearTodos}/>
    </div>
  );
}

export default App;
