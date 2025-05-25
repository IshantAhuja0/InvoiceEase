import React,{useState} from "react";
import TemplateContext from "./TemplateContext.js";
export default function TemplateContextProvider({ children }) {
  const [template,setTemplate]=useState({})
  return (
<TemplateContext.Provider value={{ template, setTemplate }}>
{children}
</TemplateContext.Provider>

    )
}