import React from "react";
import "./App.css";
import "flowbite";
import InvoicePDF from "./components/Invoicing/InvoicePDF.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Generic/Layout";
import Templates from "./components/Invoicing/Templates.jsx";
import InvoiceForm from "./components/Invoicing/InvoiceForm";
import Home from "./components/Generic/Home";
import Login from "./components/Generic/Login";
import Register from "./components/Generic/Register";
import Invoices from "./components/Invoicing/Invoices";
import AuthRequired from "../Auth/AuthRequired";
import DocumentTypeSelection from "./components/Documents/DocumentTypeSelection.jsx";
import NotFound from "./components/Generic/NotFound"; // 🔥 Import NotFound
import DocumentForm from "./components/Documents/DocumentForm.jsx";
import DocumentTemplate from "./components/Documents/DocumentTemplate.jsx";
import DocumentPDF from "./components/Documents/DocumentPdf.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested Routes */}
          <Route index element={<Home />} />
          <Route path="templates" element={<Templates />} />
          <Route path="invoiceform" element={<InvoiceForm />} />
          <Route path="bill" element={<InvoicePDF />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="invoices" element={<AuthRequired><Invoices /></AuthRequired>} />
          //documents routes
          <Route path="documents" element={<DocumentTypeSelection />} />
          <Route path="documents/preview" element={<DocumentPDF />} />
          <Route path="documents/:type" element={<DocumentForm />} />
          <Route path="*" element={<NotFound />} /> {/* ✅ Catch-all route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
