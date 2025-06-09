import React, { createContext, useMemo, useState } from "react";
const InvoiceContext = createContext();
const InvoiceContextProvider = ({ children }) => {
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0, tax: 0, line_total:0 },
  ]);

  const [firmInfo, setFirmInfo] = useState({
    firmName: "",
    firmAddress: "",
    firmGstin: "",
    firmEmail: "",
    firmPhone: "",
  });

  const [invoiceMeta, setInvoiceMeta] = useState({ invoiceNo: 1, date: "", paymentStatus: ""});

  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    customerFirm: "",
    customerAddress: "",
    customerEmail: "",
    customerPhone: "",
    invoiceNo: "",
    date: "",
  });
  let content = useMemo(
    () => ({
      firmInfo,
      setFirmInfo,
      items,
      setItems,
      customerInfo,
      setCustomerInfo,
      invoiceMeta,
      setInvoiceMeta,
    }),
    [customerInfo, firmInfo, items, invoiceMeta]
  );
  return (
    <InvoiceContext.Provider value={content}>
      {children}
    </InvoiceContext.Provider>
  );
};
export { InvoiceContext, InvoiceContextProvider };
