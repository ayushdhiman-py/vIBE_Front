import React from "react";
import ReactDOM from "react-dom/client";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop />
      <App />
      <ToastContainer floatingTime={3000} />
    </HashRouter>
  </React.StrictMode>
);
