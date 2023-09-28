import React from "react";

function TodoTable({ todos, onDelete, clearTodos }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th className="delete-btn">
            <button onClick={clearTodos} style={{ width: "80%" }}>
              Clear
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.description}</td>
            <td>{todo.date}</td>
            <td className="delete-btn">
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
