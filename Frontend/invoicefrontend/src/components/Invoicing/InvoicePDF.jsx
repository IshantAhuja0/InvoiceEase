import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceTemplate from "./InvoiceTemplate";
import { ArrowDownTrayIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { Themes } from "../Generic/Themes";
import styled, { createGlobalStyle } from "styled-components";
import TemplateContext from "../../../Context/TemplateContext";
import ThemeSwatchSelector from "../Generic/ThemeSwatchSelector";

// Global print fix
const GlobalStyles = createGlobalStyle`
  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Prevent mobile-specific styles during print */
    @media (max-width: 768px) {
      body {
        width: 100% !important;
        transform: none !important;
      }
    }
  }
`;

const InvoicePDF = () => {
  const location = useLocation();
  const useLocal = location.state?.useLocal || false;

  const { template, setTemplate } = useContext(TemplateContext) || {
    template: null,
    setTemplate: () => {},
  };

  const defaultThemeKey = Object.keys(Themes)[0];
  const [selectedKey, setSelectedKey] = useState(template?.id || defaultThemeKey);
  const [selectedTheme, setSelectedTheme] = useState(
    template?.theme || Themes[defaultThemeKey]
  );

  const componentRef = useRef();

  useEffect(() => {
    if (template?.theme) {
      setSelectedTheme(template.theme);
      setSelectedKey(template.id);
    }
  }, [template]);

const handleDownloadPDF = async () => {
  try {
    const element = componentRef.current;
    if (!element) {
      console.error("Error: Invoice container not found");
      return;
    }

    // Save original styles
    const originalStyle = element.style.cssText;

    // Device-specific adjustments
    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 2 : 2.5; // Higher scale for clarity on mobile

    // Force style for consistent output
    element.style.width = "794px";  // A4 width in px @ 96dpi
    element.style.minHeight = "1123px"; // A4 height in px @ 96dpi
    element.style.padding = "2rem";
    element.style.boxSizing = "border-box";

    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("p", "px", "a4"); // px mode for precision

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);
    pdf.save("invoice.pdf");

    // Restore original style
    element.style.cssText = originalStyle;
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

  const handleSaveImage = async () => {
    try {
      const element = componentRef.current;
      if (!element) {
        console.error("Invoice container not found");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const image = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = "invoice.jpg";
      link.click();
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleThemeChange = (e) => {
    const newKey = e.target.value;
    const newTheme = Themes[newKey];
    setSelectedKey(newKey);
    setSelectedTheme(newTheme);
    setTemplate({ theme: newTheme, id: newKey });
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
            <Title>Document Preview</Title>
  <ThemeSwatchSelector
    themes={Themes}
    currentTheme={selectedTheme}
    setTheme={setSelectedTheme}
  />
        </Header>

        <InvoiceContainer ref={componentRef} theme={selectedTheme}>
          <InvoiceTemplate local={useLocal} />
        </InvoiceContainer>

        <ButtonContainer>
          <Button $primary onClick={handleDownloadPDF}>
            <ArrowDownTrayIcon className="icon" />
            Download PDF
          </Button>
          <Button onClick={handleSaveImage}>
            <PhotoIcon className="icon" />
            Save as Image
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default InvoicePDF;


// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 430px) {
    padding: 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.025em;

  @media (max-width: 430px) {
    font-size: 1.5rem;
  }
`;

const ThemeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 430px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;

  @media (max-width: 430px) {
    font-size: 0.875rem;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px;

  @media (max-width: 430px) {
    max-width: 100%;
  }
`;

const Select = styled.select`
  appearance: none;
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
  }

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
  }

  @media (max-width: 430px) {
    font-size: 0.875rem;
    padding: 0.5rem 2rem 0.5rem 0.75rem;
  }
`;

const SelectIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%231f2937"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>') no-repeat center;
  pointer-events: none;
`;

const InvoiceContainer = styled.div`
  background-color: ${(props) => props.theme?.background || "#ffffff"};
  color: #111827;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 794px; /* A4 width at 96dpi */
  margin: 0 auto;
  box-sizing: border-box;
  transition: transform 0.3s ease;
  overflow-x: auto;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 430px) {
    padding: 1rem;
    border-radius: 0.5rem;
  }

  @media print {
    transform: none;
    width: 794px;
    min-height: 1123px;
    padding: 2rem;
    box-shadow: none;
  }
`;


const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 430px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  color: #ffffff;
  background-color: ${(props) => (props.$primary ? "#3b82f6" : "#10b981")};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    background-color: ${(props) => (props.$primary ? "#2563eb" : "#059669")};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px
      ${(props) => (props.$primary ? "rgba(59, 130, 246, 0.3)" : "rgba(16, 185, 129, 0.3)")};
  }

  @media (max-width: 430px) {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    width: 100%;
    justify-content: center;

    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
`;