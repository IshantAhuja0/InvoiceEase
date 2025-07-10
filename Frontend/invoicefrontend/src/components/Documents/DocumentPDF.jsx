import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Image } from "lucide-react";
import styled, { createGlobalStyle } from "styled-components";
import DocumentTemplate from "./DocumentTemplate";

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
  }
`;

const DocumentPDF = () => {
  const location=useLocation()
  const {  formData,type } = location.state||{};
  console.log(formData,type)
  const componentRef = useRef();

  const handleDownloadPDF = async () => {
    const element = componentRef.current;
    if (!element) return;

    const originalStyle = element.style.cssText;
    element.style.width = "794px";
    element.style.minHeight = "1123px";
    element.style.padding = "2rem";

    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      backgroundColor: "#fff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("p", "px", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);
    pdf.save("document.pdf");

    element.style.cssText = originalStyle;
  };

  const handleSaveImage = async () => {
    const element = componentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
    });

    const image = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = "document.jpg";
    link.click();
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <Title>Document Preview</Title>
        </Header>

        <DocumentContainer ref={componentRef}>
        <DocumentTemplate type={type} data={formData} />
        </DocumentContainer>

        <ButtonContainer>
          <Button $primary onClick={handleDownloadPDF}>
            <Download className="icon" /> Download PDF
          </Button>
          <Button onClick={handleSaveImage}>
            <Image className="icon" /> Save as Image
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default DocumentPDF;

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
  min-height: 100vh;
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
`;

const DocumentContainer = styled.div`
  background: #fff;
  color: #111827;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 794px;
  margin: 0 auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  @media print {
    width: 794px;
    min-height: 1123px;
    box-shadow: none;
    padding: 2rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
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

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    background-color: ${(props) => (props.$primary ? "#2563eb" : "#059669")};
    transform: translateY(-2px);
  }
`;
