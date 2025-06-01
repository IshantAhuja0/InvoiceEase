import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, LayoutTemplate, ShieldCheck, DownloadCloud
} from 'lucide-react';

const features = [
  {
    title: "Create Invoices Easily",
    description: "Generate polished invoices in just a few clicks with our intuitive interface.",
    icon: FileText,
  },
  {
    title: "Stylish Templates",
    description: "Pick from professionally designed templates that make your business shine.",
    icon: LayoutTemplate,
  },
  {
    title: "Privacy First",
    description: "Your data is protected with enterprise-grade encryption and security.",
    icon: ShieldCheck,
  },
  {
    title: "Instant PDF Export",
    description: "Download and share professional PDFs instantly with one click.",
    icon: DownloadCloud,
  }
];

const FloatingElement = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      >
      {children}
    </div>
  );
};


const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;
  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center space-y-4">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100">
        <Icon size={28} className="text-blue-900" />
      </div>
      <h3 className="text-lg font-semibold text-blue-900">{feature.title}</h3>
      <p className="text-gray-600 text-sm">{feature.description}</p>
    </div>
  );
}


export default function Home() {
  const navigate=useNavigate()
   function handleCreateInvoice(){
    navigate("/templates")
   }
   function handleNewAccount(){
    navigate("/register")
   }
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-blue-900">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Hero Section */}
        <FloatingElement>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-900 to-blue-600 text-transparent bg-clip-text">
                InvoiceEase
              </span>
            </h1>
            <p className="text-lg sm:text-xl mt-6 text-blue-800">
              Send polished, professional invoices — no design skills required.
            </p>
            <p className="text-sm italic text-blue-600 mt-2">"Built for creators, powered by simplicity."</p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button onClick={handleCreateInvoice} className="bg-blue-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition-all">
                Create Your First Invoice
              </button>
              {/* <button className="border border-blue-200 text-blue-900 px-8 py-3 rounded-full text-lg hover:bg-blue-100 transition-all">
                Watch Demo →
              </button> */}
            </div>
          </div>
        </FloatingElement>

        {/* Features Section */}
        <FloatingElement delay={300}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text">
              invoice like a pro
            </span>
          </h2>
        </FloatingElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <FloatingElement delay={1000}>
          <div className="mt-24 text-center">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl py-12 px-6 max-w-3xl mx-auto shadow">
              <h3 className="text-2xl font-semibold mb-4">
                Ready to streamline your invoicing?
              </h3>
              <p className="text-blue-800 mb-8">
                Join thousands of professionals who simplified their billing with InvoiceEase.
              </p>
              <button onClick={handleNewAccount} className="bg-blue-900 text-white px-10 py-4 rounded-full font-semibold hover:bg-blue-800 transition-all">
                Get Started Free
              </button>
            </div>
          </div>
        </FloatingElement>
      </div>
    </div>
  );
} 