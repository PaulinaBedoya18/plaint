import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Enrutador from "./router/enrutador.jsx";

import "./main.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Enrutador />
    </BrowserRouter>
  </React.StrictMode>
);