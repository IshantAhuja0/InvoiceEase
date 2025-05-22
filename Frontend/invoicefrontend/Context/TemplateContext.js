import { createContext } from "react";

const TemplateContext = createContext({
  templateName: "",
  templateImage: "",
  setTemplate: () => {},
});

export default TemplateContext;
