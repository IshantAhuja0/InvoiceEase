import React,{createContext, useState} from 'react'
const InvoiceContext=createContext();
const InvoiceContextProvider=({children})=>{
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0, tax: 0 },
  ]);

  const [firmInfo, setFirmInfo] = useState({
    firmName: "",
    firmAddress: "",
    firmGstin: "",
    firmEmail: "",
    firmPhone: "",
  });

  const [invoiceMeta, setInvoiceMeta] = useState({ invoiceNo: "", date: "" });

  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    customerFirm: "",
    customerAddress: "",
    customerEmail: "",
    customerPhone: "",
    invoiceNo:"",
    date:""
  });
  let contextValue={
    firmInfo,
    setFirmInfo,
    items,
    setItems,
    customerInfo,
    setCustomerInfo,
    invoiceMeta, 
    setInvoiceMeta
  }
  return(
    <InvoiceContext.Provider value={contextValue}>
      {children}
    </InvoiceContext.Provider>
  )
}
export  {InvoiceContext,InvoiceContextProvider};

