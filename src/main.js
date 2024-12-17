import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

var root = document.createElement("div");
// Add an id and class
root.id = "root-div"; // Assigns an id
root.className = "root-container"; // Assigns a class

ReactDOM.render(
  <App />,
  document.body.appendChild(root)
)

