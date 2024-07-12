import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


// import alert from "./functionality/alert/alertFunction"



var root = document.createElement("div");
root.style.height = "100vh";
root.style.overflow = "auto";
root.style.padding = "10px 20px";





ReactDOM.render(
  <App />,
  document.body.appendChild(root)
)

