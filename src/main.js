import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import UserMetrics from "./UserMetrics";
import { entrypoints } from "uxp";
import appPanel from './css/App.modules.css'
import metricsPanel from './css/UserMetrics.modules.css'
import { WorkSubmissions } from "./functionality/collector";


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
        root.className = appPanel.rootContainer; 
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
        root.className = metricsPanel.rootContainer; 
        body.appendChild(root);
        ReactDOM.render(<WorkSubmissions />, root);
      },
    },

    // this section is the reason i have two manifest.json files, dev being the one which runs with this code
  },
});
