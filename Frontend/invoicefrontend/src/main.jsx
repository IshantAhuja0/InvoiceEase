import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import TemplateContextProvider from "../Context/TemplateContextProvider.jsx";
import { InvoiceContextProvider } from "../Context/InvoiceContext.jsx";
import { AuthProvider } from "../Context/AuthContext.jsx";
import AppProviders from "../Context/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
    <AppProviders>
      <App />
    </AppProviders>
);
