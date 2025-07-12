import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/store.js";
import App from "./App.jsx";
import AppProviders from "../Context/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppProviders>
      <App />
    </AppProviders>

  </Provider>
);
