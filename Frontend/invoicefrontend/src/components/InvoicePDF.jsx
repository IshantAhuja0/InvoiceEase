import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ClassicBlue from "../../Invoice Templates/ClassicBlue";
import { ArrowDownTrayIcon, PhotoIcon, ShareIcon } from "@heroicons/react/24/solid";

const InvoicePDF = () => {
  const componentRef = useRef();

  // PDF Download Handler
  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(componentRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
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
  };

  // Save Image Handler
  const handleSaveImage = async () => {
    const canvas = await html2canvas(componentRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const image = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = "invoice.jpg";
    link.click();
  };

  // Share on WhatsApp
  const handleShareWhatsApp = async () => {
    const message = encodeURIComponent("Hey, check out this invoice I created! (Replace this with a link or upload preview)");
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <div className="p-6">
      <div ref={componentRef} className="bg-white text-black p-6 rounded shadow max-w-4xl mx-auto">
        <ClassicBlue />
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        {/* Download PDF */}
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-blue-900 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition transform hover:scale-105"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Download PDF
        </button>

        {/* Save as Image */}
        <button
          onClick={handleSaveImage}
          className="flex items-center gap-2 bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
        >
          <PhotoIcon className="h-5 w-5" />
          Save as Image
        </button>

        {/* Share on WhatsApp */}
        {/* <button
          onClick={handleShareWhatsApp}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-lg hover:bg-emerald-500 transition transform hover:scale-105"
        >
          <ShareIcon className="h-5 w-5" />
          Share on WhatsApp
        </button> */}
      </div>
    </div>
  );
};

export default InvoicePDF;
