import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";

import stores from "./Service/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

      <Provider store={stores}>
      
          <Router>
            <App />
          </Router>
       
      </Provider>
 
  </React.StrictMode>
);