import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, History } from "lucide-react";

export default function InvoiceSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-slate-100 text-blue-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-16 tracking-tight">
          Manage Your Invoices with Ease
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Create New Invoice Panel */}
          <div className="group relative bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="absolute top-6 left-6 bg-blue-900 p-4 rounded-xl text-white z-10">
              <PlusCircle size={32} />
            </div>
            <div className="p-12 pt-24 text-left z-20 relative">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-900">
                Create a New Invoice
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Quickly generate a new invoice using customizable templates. Fast, clean, and professional.
              </p>
              <button
                onClick={() => navigate("/templates")}
                className="bg-blue-900 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-800 transition"
              >
                Start Invoicing
              </button>
            </div>
          </div>

          {/* View Saved Invoices Panel */}
          <div className="group relative bg-gradient-to-br from-slate-100 via-slate-50 to-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="absolute top-6 left-6 bg-blue-900 p-4 rounded-xl text-white z-10">
              <History size={32} />
            </div>
            <div className="p-12 pt-24 text-left z-20 relative">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-900">
                View Past Invoices
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Access all your previously created invoices securely in one place. Reuse, download, or share them instantly.
              </p>
              <button
                onClick={() => navigate("/invoices")}
                className="bg-blue-900 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-800 transition"
              >
                View Invoices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
