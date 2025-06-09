import React, { useMemo, useState, useEffect } from "react";
import TemplateContext from "./TemplateContext";

export default function TemplateContextProvider({ children }) {
  const [template, setTemplateState] = useState({
    theme: {},
    id: "",
  });
  const [isTemplateReady, setIsTemplateReady] = useState(false);

  // Load from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("invoice-template");
    if (saved) {
      setTemplateState(JSON.parse(saved));
      setIsTemplateReady(true); // Or false if you want to redirect manually
    }
  }, []);

  const setTemplate = (newTemplate) => {
    setTemplateState(newTemplate);
    setIsTemplateReady(true);
  };

  const content = useMemo(
    () => ({
      template,
      setTemplate,
      isTemplateReady,
      setIsTemplateReady,
    }),
    [template, isTemplateReady]
  );

  return (
    <TemplateContext.Provider value={content}>
      {children}
    </TemplateContext.Provider>
  );
}
