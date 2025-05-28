import React, { useState, useEffect } from 'react';
import {
  FileText, LayoutTemplate, ShieldCheck, DownloadCloud
} from 'lucide-react';

const features = [
  {
    title: "Create Invoices Easily",
    description: "Generate polished invoices in just a few clicks with our intuitive interface.",
    icon: <FileText size={40} className="text-white" />,
    gradient: "from-blue-500 to-blue-700"
  },
  {
    title: "Stylish Templates",
    description: "Pick from professionally designed templates that make your business shine.",
    icon: <LayoutTemplate size={40} className="text-white" />,
    gradient: "from-indigo-500 to-indigo-700"
  },
  {
    title: "Privacy First",
    description: "Your data is protected with enterprise-grade encryption and security.",
    icon: <ShieldCheck size={40} className="text-white" />,
    gradient: "from-slate-500 to-slate-700"
  },
  {
    title: "Instant PDF Export",
    description: "Download and share professional PDFs instantly with one click.",
    icon: <DownloadCloud size={40} className="text-white" />,
    gradient: "from-blue-600 to-indigo-600"
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

const FeatureCard = ({ feature, index }) => {
  return (
    <FloatingElement delay={300 + index * 150}>
      <div
        className={`group relative bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 transition-all duration-500 
        hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
        <div className="relative text-center">
          <div className="mb-4 flex justify-center items-center">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {feature.title}
          </h3>
          <p className="text-white/80 leading-relaxed text-sm">
            {feature.description}
          </p>
        </div>
      </div>
    </FloatingElement>
  );
};

export default function Home() {

  return (
    <div className="min-h-screen relative overflow-hidden bg-blue-900 text-white">

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <FloatingElement>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-50 to-white text-transparent bg-clip-text">
                InvoiceEase
              </span>
            </h1>
            <p className="text-lg sm:text-xl mt-6 text-white/90">
              Send polished, professional invoices — no design skills required.
            </p>
            <p className="text-sm italic text-white/50 mt-2">"Built for creators, powered by simplicity."</p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all">
                Create Your First Invoice
              </button>
              <button className="border border-white/20 text-white px-8 py-3 rounded-full text-lg hover:bg-white/10 transition-all">
                Watch Demo →
              </button>
            </div>
          </div>
        </FloatingElement>

        {/* Features Section */}
        <FloatingElement delay={300}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-blue-100 to-white text-transparent bg-clip-text">
              invoice like a pro
            </span>
          </h2>
        </FloatingElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA */}
        <FloatingElement delay={1000}>
          <div className="mt-24 text-center">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl py-12 px-6 max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4">
                Ready to streamline your invoicing?
              </h3>
              <p className="text-white/80 mb-8">
                Join thousands of professionals who simplified their billing with InvoiceEase.
              </p>
              <button className="bg-white text-blue-900 px-10 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all">
                Get Started Free
              </button>
            </div>
          </div>
        </FloatingElement>
      </div>
    </div>
  );
}
