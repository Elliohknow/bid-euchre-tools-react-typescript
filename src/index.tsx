import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ContextStore from "./ContextStore";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ContextStore>
      <App />
    </ContextStore>
  </React.StrictMode>,
  document.getElementById("root")
);
