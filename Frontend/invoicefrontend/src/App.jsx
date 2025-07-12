import React from "react";
import "./App.css";
import "flowbite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Generic/Layout";
import Home from "./components/Generic/Home";
import Login from "./components/Generic/Login";
import Register from "./components/Generic/Register";
import NotFound from "./components/Generic/NotFound";

import Templates from "./components/Invoicing/Templates";
import InvoiceForm from "./components/Invoicing/InvoiceForm";
import InvoicePDF from "./components/Invoicing/InvoicePDF";
import Invoices from "./components/Invoicing/Invoices";
import InvoiceSelection from "./components/Invoicing/InvoiceSelection";

import DocumentTypeSelection from "./components/Documents/DocumentTypeSelection";
import DocumentForm from "./components/Documents/DocumentForm";
import DocumentPDF from "./components/Documents/DocumentPDF";

import AuthRequired from "../Auth/AuthRequired";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 🏠 Home */}
          <Route index element={<Home />} />

          {/* 🔐 Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* 🧾 Invoicing */}
          <Route path="invoice" element={<InvoiceSelection />} />
          <Route path="templates" element={<Templates />} />
          <Route path="invoiceform" element={<InvoiceForm />} />
          <Route path="bill" element={<InvoicePDF />} />
          <Route path="invoices" element={<AuthRequired><Invoices /></AuthRequired>} />

          {/* 📄 Documents */}
          <Route path="documents" element={<DocumentTypeSelection />} />
          <Route path="documents/:type" element={<DocumentForm />} />
          <Route path="documents/preview" element={<DocumentPDF />} />

          {/* ❌ 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
