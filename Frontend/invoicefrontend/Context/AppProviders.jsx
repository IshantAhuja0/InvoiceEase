import React from "react";
import { AuthProvider } from "../Context/AuthContext";
import { InvoiceContextProvider } from "../Context/InvoiceContext";
import TemplateContextProvider from "../Context/TemplateContextProvider";

const AppProviders = ({ children }) => (
  <InvoiceContextProvider>
    <TemplateContextProvider>
      <AuthProvider>{children}</AuthProvider>
    </TemplateContextProvider>
  </InvoiceContextProvider>
);

export default AppProviders;
