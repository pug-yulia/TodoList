import { useState } from "react";

function TodoList() {
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
    const newTodo = { description: desc, date: date }; //new to-do object
    setTodos([...todos, newTodo]); //add to the array
    setDesc(""); //clear the description input
    setDate(""); //clear the date input
  };

  return (
    <>
      <h1 style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
        Todo List
      </h1>
      <div class="input-area">
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

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{todo.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TodoList;
