import React,{Suspense,lazy} from "react";
import "./App.css";
import "flowbite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Generic/Layout";
import Home from "./components/Generic/Home";
//lazy loading
const Login=lazy(()=>import ("./components/Generic/Login"));
const NotFound = lazy(() => import("./components/Generic/NotFound"));
const Templates=lazy(()=>import("./components/Invoicing/Templates"));
const Register = lazy(() => import("./components/Generic/Register"));
const InvoiceForm = lazy(() => import("./components/Invoicing/InvoiceForm"));
const InvoicePDF = lazy(() => import("./components/Invoicing/InvoicePDF"));
const Invoices = lazy(() => import("./components/Invoicing/Invoices"));
const InvoiceSelection = lazy(() => import("./components/Invoicing/InvoiceSelection"));
const DocumentTypeSelection = lazy(() => import("./components/Documents/DocumentTypeSelection"));
const DocumentForm = lazy(() => import("./components/Documents/DocumentForm"));
const DocumentPDF = lazy(() => import("./components/Documents/DocumentPDF"));

import AuthRequired from "../Auth/AuthRequired";
import SuspenseLoader from "./components/Generic/SuspenseLoader";

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<SuspenseLoader/>}>
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

    </Suspense>
    </BrowserRouter>
  );
}

export default App;
