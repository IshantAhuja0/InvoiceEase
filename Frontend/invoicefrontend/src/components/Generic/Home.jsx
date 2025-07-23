import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, LayoutTemplate, ShieldCheck, DownloadCloud
} from 'lucide-react';

const features = [
  {
    title: "Create Invoices & Documents",
    description: "Craft professional invoices, offer letters, and more in just a few clicks.",
    icon: FileText,
  },
  {
    title: "Modern Templates",
    description: "Choose from designer-grade templates for invoices and all kinds of letters.",
    icon: LayoutTemplate,
  },
  {
    title: "Bank-Level Security",
    description: "All your data is encrypted and stored securely in the cloud.",
    icon: ShieldCheck,
  },
  {
    title: "Instant PDF Export",
    description: "Download polished documents or invoices instantly with one click.",
    icon: DownloadCloud,
  }
];

const documentTypes = [
  { title: "Internship Letter", description: "Confirm internships with professional templates." },
  { title: "Offer Letter", description: "Send out formal job offers in seconds." },
  { title: "Experience Letter", description: "Issue verified experience letters with ease." },
  { title: "Promotion Letter", description: "Communicate promotions clearly and professionally." },
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
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg text-center flex flex-col items-center space-y-4">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100">
        <Icon size={28} className="text-blue-900" />
      </div>
      <h3 className="text-lg font-semibold text-blue-900">{feature.title}</h3>
      <p className="text-gray-600 text-sm">{feature.description}</p>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-blue-900">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">

        {/* Hero Section */}
        <FloatingElement>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-blue-900 to-blue-600 text-transparent bg-clip-text">
                DocSprint
              </span>
            </h1>
            <p className="text-lg sm:text-xl mt-6 text-blue-800">
              Generate Invoices, Offer Letters, Experience Letters, and more — in minutes.
            </p>
            <p className="text-sm italic text-blue-600 mt-2">"All your professional docs in one elegant platform."</p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => navigate("/documents")}
                className="bg-blue-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition-all"
              >
                Create Your First Document
              </button>
              <button
                onClick={() => navigate("/templates")}
                className="border border-blue-200 text-blue-900 px-8 py-3 rounded-full text-lg hover:bg-blue-100 transition-all"
              >
                Explore Invoice Templates
              </button>
            </div>
          </div>
        </FloatingElement>

        {/* Features Section */}
        <FloatingElement delay={200}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text">
              invoice and document like a pro
            </span>
          </h2>
        </FloatingElement>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Document Types Section */}
        <FloatingElement delay={400}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mt-24 mb-12">
            Documents You Can Generate
          </h2>
        </FloatingElement>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {documentTypes.map((doc, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 shadow hover:shadow-lg text-center">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">{doc.title}</h4>
              <p className="text-gray-600 text-sm">{doc.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <FloatingElement delay={600}>
          <div className="mt-24 bg-blue-50 border border-blue-100 rounded-3xl py-10 px-6 max-w-5xl mx-auto shadow text-center grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-blue-900">4K+</h3>
              <p className="text-sm text-blue-700">Documents Generated</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-900">2K+</h3>
              <p className="text-sm text-blue-700">Users Registered</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-900">100%</h3>
              <p className="text-sm text-blue-700">Free & Secure</p>
            </div>
          </div>
        </FloatingElement>

        {/* Testimonial */}
        <FloatingElement delay={800}>
          <div className="mt-24 bg-white border border-blue-100 rounded-3xl p-10 text-center max-w-4xl mx-auto shadow">
            <p className="text-xl italic text-blue-800 mb-4">
              DocSprint helped me send invoices and offer letters faster than ever. It’s a game changer!”
            </p>
            <span className="block text-blue-600 font-semibold">— A Freelancer, Delhi</span>
          </div>
        </FloatingElement>

        {/* CTA Card */}
        <FloatingElement delay={1000}>
          <div className="mt-24 text-center">
            <div className="bg-blue-50 border border-blue-100 rounded-3xl py-12 px-6 max-w-3xl mx-auto shadow">
              <h3 className="text-2xl font-semibold mb-4">
                Ready to simplify your work?
              </h3>
              <p className="text-blue-800 mb-8">
                Join professionals using DocSprint to create stunning invoices and documents.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-900 text-white px-10 py-4 rounded-full font-semibold hover:bg-blue-800 transition-all"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </FloatingElement>

        {/* Footer Login Prompt */}
        <FloatingElement delay={1200}>
          <div className="mt-16 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-blue-700 underline hover:text-blue-900">
              Log in here
            </button>
          </div>
        </FloatingElement>
      </div>
    </div>
  );
}
