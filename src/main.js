import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserMetrics from "./UserMetrics";
import { entrypoints } from "uxp";
import styles from './css/App.modules.css'


// Multi-Panel Set-up
entrypoints.setup({
  panels: {
    firstPanel: {
      show(body) {
        while (body.firstChild) {
          body.removeChild(body.firstChild);
        }
        const root = document.createElement("div");
        root.id = "root-div"; 
        root.className = styles.rootContainer; 
        body.appendChild(root);

        ReactDOM.render(<App />, root);
      },
    },
    secondPanel: {
      show(body) {
        while (body.firstChild) {
          body.removeChild(body.firstChild);
        }
        
        const root = document.createElement("div");
        root.id = "root-metrics"; 
        root.className = "root-container"; 
        body.appendChild(root);
        ReactDOM.render(<UserMetrics />, root);
      },
    },
  },
});
