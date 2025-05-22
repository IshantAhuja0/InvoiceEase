import React,{useState} from "react";
import TemplateContext from "./TemplateContext";
const [template,setTemplate]=useState({})
export default function TemplateContextProvider({ children }) {
  <TemplateContext.Provider value={{ template, setTemplate }}>
    {children}
    </TemplateContext.Provider>
}