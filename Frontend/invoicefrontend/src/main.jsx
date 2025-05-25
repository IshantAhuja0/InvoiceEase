import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import TemplateContextProvider from "../Context/TemplateContextProvider.jsx";
import { InvoiceContextProvider } from "../Context/InvoiceContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InvoiceContextProvider>
      <TemplateContextProvider>
        <App />
      </TemplateContextProvider>
    </InvoiceContextProvider>
  </StrictMode>
);
