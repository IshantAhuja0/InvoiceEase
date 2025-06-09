import { createContext } from "react";

const TemplateContext = createContext({
  theme: {},
  id: "",
  setTemplate: () => {},
  isTemplateReady: false,
  setIsTemplateReady: () => {},
});

export default TemplateContext;
