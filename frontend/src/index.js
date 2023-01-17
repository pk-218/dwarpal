import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL || "http://localhost:8000/api";
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
