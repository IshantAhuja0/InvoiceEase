import React,{createContext, useState} from 'react'
const InvoiceContext=createContext()
export default InvoiceContextProvider=({children})=>{
  const [firmInfo, setFirmInfo] = useState({});
  const [customerInfo, setCustomerInfo] = useState({});
  const [items, setItems] = useState([]);
  contextValue={
    firmInfo,
    setFirmInfo,
    items,
    setItems,
    customerInfo,
    setCustomerInfo
  }
  return(
    <InvoiceContext.Provider value={contextValue}>
      {children}
    </InvoiceContext.Provider>
  )
}