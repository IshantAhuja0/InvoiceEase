import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceTemplate from "../../Invoice Templates/InvoiceTemplate";
import { ArrowDownTrayIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { invoiceThemes } from "../../Invoice Templates/invoiceThemes";
import styled from "styled-components";

const InvoicePDF = () => {
  const componentRef = useRef();
  const [selectedTheme, setSelectedTheme] = useState(invoiceThemes[0]);

  // PDF Download Handler
  const handleDownloadPDF = async () => {
    try {
      const canvas = await html2canvas(componentRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth * 0.85;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const x = (pageWidth - imgWidth) / 2;
      const y = 20;

      pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Save Image Handler
  const handleSaveImage = async () => {
    try {
      const canvas = await html2canvas(componentRef.current, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: true,
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

  // Theme selector handler
  const handleThemeChange = (e) => {
    const themeName = e.target.value;
    const newTheme = invoiceThemes.find((theme) => theme.name === themeName);
    setSelectedTheme(newTheme);
  };

  return (
    <Container>
      <ThemeSelector className="mt-8 mx-6">
        <Label htmlFor="theme-select">Select Theme:</Label>
        <Select
          id="theme-select"
          onChange={handleThemeChange}
          value={selectedTheme.name}
        >
          {invoiceThemes.map((theme) => (
            <option key={theme.name} value={theme.name}>
              {theme.name}
            </option>
          ))}
        </Select>
      </ThemeSelector>

      <InvoiceContainer ref={componentRef}>
        <InvoiceTemplate theme={selectedTheme} />
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
  );
};

const Container = styled.div`
  padding: 1rem;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 430px) {
    padding: 0.5rem;
  }
`;

const ThemeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 430px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;

  @media (max-width: 430px) {
    font-size: 0.75rem;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
  max-width: 12rem;

  &:focus {
    outline: none;
    border-color: #1e40af;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.2);
  }

  @media (max-width: 430px) {
    font-size: 0.75rem;
    padding: 0.375rem;
    max-width: 100%;
  }
`;

const InvoiceContainer = styled.div`
  background-color: #ffffff;
  color: #000000;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 210mm;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    padding: 1rem;
  }

  @media (max-width: 430px) {
    transform: scale(0.8);
    transform-origin: top;
    padding: 0.75rem;
    border-radius: 0.25rem;
  }

  @media print {
    transform: none;
    width: 210mm;
    min-height: 297mm;
    padding: 1.5rem;
    box-shadow: none;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 430px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #ffffff;
  background-color: ${(props) => (props.$primary ? "#1e3a8a" : "#15803d")};
  transition: background-color 0.2s, transform 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;

  .icon {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: ${(props) => (props.$primary ? "#1e40af" : "#16a34a")};
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${(props) => (props.$primary ? "rgba(30, 64, 175, 0.4)" : "rgba(22, 163, 74, 0.4)")};
  }

  @media (max-width: 430px) {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
    width: 100%;
    justify-content: center;

    .icon {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
`;

export default InvoicePDF;
