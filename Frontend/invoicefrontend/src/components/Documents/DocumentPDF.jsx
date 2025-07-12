import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Image, CheckCircle2 } from "lucide-react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import DocumentTemplate from "./DocumentTemplate";
import { Themes } from "../Generic/Themes";
import ThemeSwatchSelector from "../Generic/ThemeSwatchSelector";


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
const generateFileName = (prefix, ext) => {
  const date = new Date();
  // Format: YYYYMMDD_HHMM
  const formattedDate = `${date.getFullYear()}${(date.getMonth()+1)
    .toString().padStart(2, "0")}${date.getDate()
    .toString().padStart(2, "0")}_${date.getHours()
    .toString().padStart(2, "0")}${date.getMinutes()
    .toString().padStart(2, "0")}`;
  return `${prefix}_${formattedDate}.${ext}`;
};

const DocumentPDF = () => {
  const location = useLocation();
  const { formData, type } = location.state || {};
  const componentRef = useRef();
  const [selectedTheme, setSelectedTheme] = useState(Themes[0]);

  // State for popup notification
  const [popup, setPopup] = useState({ visible: false, message: "", icon: null });

  // Show popup for 2 seconds
  const showPopup = (message, icon) => {
    setPopup({ visible: true, message, icon });
    setTimeout(() => setPopup({ visible: false, message: "", icon: null }), 2000);
  };

const handleDownloadPDF = async () => {
  const src = componentRef.current;
  if (!src) return;

  const clone = src.cloneNode(true);
  Object.assign(clone.style, {
    position: "absolute",
    top: "-9999px",
    left: "-9999px",
    width: "794px",
    minHeight: "1123px",
    padding: "2rem",
    background: "#fff",
    overflow: "hidden",
  });
  document.body.appendChild(clone);

  const canvas = await html2canvas(clone, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: "#fff",
  });
  document.body.removeChild(clone);

  const imgData = canvas.toDataURL("image/jpeg", 1.0);
  const pdf = new jsPDF("p", "px", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);
  pdf.save(generateFileName("document", "pdf"));

  showPopup("PDF downloaded!", <Download className="icon" />);
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
  link.download = generateFileName("document", "jpg");
    link.click();

    showPopup("Image downloaded!", <Image className="icon" />);
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

        <DocumentContainer ref={componentRef}>
<DocumentTemplate type={type} data={formData} theme={selectedTheme} />

        </DocumentContainer>

        <ButtonContainer>
          <Button $primary onClick={handleDownloadPDF}>
            <Download className="icon" /> Download PDF
          </Button>
          <Button onClick={handleSaveImage}>
            <Image className="icon" /> Save as Image
          </Button>
        </ButtonContainer>

        {/* Popup Notification */}
        <AnimatePresence>
          {popup.visible && (
            <PopupWrapper
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PopupIcon>{popup.icon}</PopupIcon>
              <span>{popup.message}</span>
            </PopupWrapper>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default DocumentPDF;

// Styled Components (including popup styles)
const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  @media (max-width: 640px) {
    padding: 0rem;
  }
`;

const DocumentContainer = styled.div`
  background: #fff;
  color: #111827;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 794px;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 640px) {
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: none;
    margin: 0.8rem;
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 794px;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    margin: 0.4rem;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
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

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    background-color: ${(props) => (props.$primary ? "#2563eb" : "#059669")};
    transform: translateY(-2px);
  }
`;

const PopupWrapper = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  z-index: 9999;
  max-width: 90vw;
  text-align: center;
  pointer-events: none;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 0.5rem 1rem;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`;

const PopupIcon = styled.div`
  display: flex;
  align-items: center;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5;
  }
`;


