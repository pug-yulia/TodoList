import React, { useState } from "react";
import { useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function App() {
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [todos, setTodos] = useState([]);
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      checkboxSelection: true,
      headerCheckboxSelection: true,
      suppressMovable: true,
      width: 50,
    },
    {
      field: "description",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      width: 225,
    },
    { field: "date", sortable: true, editable: true, filter: true },
    {
      field: "priority",
      sortable: true,
      filter: true,
      editable: true,
      cellStyle: (params) =>
        params.value === "High" || params.value === "high"
          ? { color: "red" }
          : { color: "black" },
    },
  ]);

  const gridRef = useRef();
  const [selectedRows, setSelectedRows] = useState([]);

  const inputChanged = (event) => {
    const { name, value } = event.target;
    if (name === "desc") {
      setDesc(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "priority") {
      setPriority(value);
    }
  };

  const addTodo = (event) => {
    event.preventDefault();
    const newTodo = { description: desc, date: date, priority: priority };
    setTodos([...todos, newTodo]);
    setDesc("");
    setDate("");
    setPriority("");
  };

  const deleteTodo = () => {
    if (selectedRows.length > 0) {
      const indicesToDelete = selectedRows.map((row) => todos.indexOf(row));
      const updatedTodos = todos.filter(
        (_, index) => !indicesToDelete.includes(index)
      );
      setTodos(updatedTodos);
    } else {
      alert("Select row(s) first");
    }
  };

  return (
    <div className="content-container">
      <div className="input-area">
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
      <TextField
          label="Description"
          variant="standard"
          name="desc"
          value={desc}
          onChange={inputChanged}
          style={{ marginRight: "10px", height: "30px" }}
        />
        <TextField
          label="Date"
          variant="standard"
          name="date"
          value={date}
          onChange={inputChanged}
          style={{ marginLeft: "5px", height: "30px", minWidth: "150px" }}
        />
        <TextField
          label="Priority"
          variant="standard"
          name="priority"
          value={priority}
          onChange={inputChanged}
          style={{ marginLeft: "15px", height: "30px" }}
        />
        <Button onClick={addTodo} variant="contained">
          Add
        </Button>
        <Button onClick={deleteTodo} variant="contained">
          Delete
        </Button>
        </Stack>
      </div>
      <div className="ag-theme-alpine" style={{ height: 480, width: 680 }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="multiple"
          animateRows={true}
          rowData={todos}
          columnDefs={columnDefs}
          onSelectionChanged={() => {
            const selectedNodes = gridRef.current.getSelectedNodes();
            const selectedData = selectedNodes.map((node) => node.data);
            setSelectedRows(selectedData);
          }}
        ></AgGridReact>
        <div>Selected Rows: {selectedRows.length}</div>
      </div>
    </div>
  );
}

export default App;
