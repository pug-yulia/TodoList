import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import App from "./App";

import React, { useState } from "react";
function TabApp() {
  const [value, setValue] = useState("one");

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="Home" />
        <Tab value="two" label="TODOS" />
      </Tabs>
      {value === "one" && (
        <div style={{ textAlign: "center" }}>
          <h2>Welcome?</h2>
        </div>
      )}
      {value === "two" && (
        <div>
          <App />
        </div>
      )}
    </div>
  );
}
export default TabApp;
