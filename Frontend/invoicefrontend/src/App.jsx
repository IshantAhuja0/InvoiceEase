import React from "react";
import "./App.css";
import "flowbite";
import InvoicePDF from "./components/InvoicePDF";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./main-components/Layout";
import Templates from "./components/Templates";
import InvoiceForm from "./components/InvoiceForm";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Invoices from "./components/Invoices";
import AuthRequired from "../Auth/AuthRequired";
import NotFound from "./components/NotFound"; // 🔥 Import NotFound

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
          <Route path="*" element={<NotFound />} /> {/* ✅ Catch-all route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
