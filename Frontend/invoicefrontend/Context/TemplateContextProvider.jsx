import React, { useMemo, useState } from "react";
import TemplateContext from "./TemplateContext.js";
export default function TemplateContextProvider({ children }) {
  const [template, setTemplate] = useState({
    templateName: "",
    templateImage: "",
  });

  let content = useMemo(
    () => ({
      template,
      setTemplate,
    }),
    [template]
  );
  return (
    <TemplateContext.Provider value={ content }>
      {children}
    </TemplateContext.Provider>
  );
}
