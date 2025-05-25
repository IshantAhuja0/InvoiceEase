import React from "react";
import "./App.css";
import "flowbite";
import InvoicePDF from "./components/InvoicePDF";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./main-components/Layout";
import Templates from "./components/Templates";
import InvoiceForm from "./components/InvoiceForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          Add more nested routes here
          <Route path="/templates" element={<Templates />} />
          <Route path="/invoiceform" element={<InvoiceForm />} />
          <Route path="/bill" element={<InvoicePDF />} />
        </Route>
        {/* Define other routes that don't use the layout outside the Layout Route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
