import React, { useState, useEffect } from 'react';

const features = [
  {
    title: "Create Invoices Easily",
    description: "Generate polished invoices in just a few clicks with our intuitive interface.",
    icon: "📄",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    title: "Stylish Templates",
    description: "Pick from professionally designed templates that make your business shine.",
    icon: "🎨",
    gradient: "from-indigo-400 to-indigo-600"
  },
  {
    title: "Privacy First",
    description: "Your data is protected with enterprise-grade encryption and security.",
    icon: "🔒",
    gradient: "from-slate-400 to-slate-600"
  },
  {
    title: "Instant PDF Export",
    description: "Download and share professional PDFs instantly with one click.",
    icon: "📥",
    gradient: "from-blue-500 to-indigo-500"
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
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FloatingElement delay={300 + index * 150}>
      <div
        className={`group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 
          transform transition-all duration-500 hover:scale-105 hover:bg-white/20
          hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer
          ${isHovered ? 'rotate-1' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 
          group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
        
        {/* Floating icon */}
        <div className="relative">
          <div className={`text-6xl mb-6 transform transition-all duration-500 
            group-hover:scale-110 group-hover:-rotate-12 flex justify-center
            ${isHovered ? 'animate-bounce' : ''}`}>
            {feature.icon}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-blue-50 transition-colors">
            {feature.title}
          </h3>
          
          <p className="text-blue-50/80 text-center leading-relaxed group-hover:text-white transition-colors">
            {feature.description}
          </p>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </FloatingElement>
  );
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '4s' }} />
      </div>

      {/* Mouse follower */}
      <div 
        className="fixed w-6 h-6 bg-white/40 rounded-full blur-sm pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${Math.sin(Date.now() * 0.003) * 0.5 + 1.5})`
        }}
      />

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20 max-w-5xl mx-auto">
          <FloatingElement>
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-blue-50 to-white 
                  text-transparent bg-clip-text drop-shadow-2xl">
                  Invoice
                </span>
                <span className="bg-gradient-to-r from-blue-100 via-white to-blue-50 
                  text-transparent bg-clip-text">
                  Ease
                </span>
              </h1>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 text-4xl animate-spin-slow">✨</div>
              <div className="absolute -bottom-4 -left-8 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>💫</div>
            </div>
          </FloatingElement>

          <FloatingElement delay={200}>
            <p className="text-white/90 text-lg sm:text-xl lg:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed">
              Send polished, professional invoices — no design skills required.
            </p>
          </FloatingElement>

          <FloatingElement delay={400}>
            <p className="italic text-blue-100/60 text-sm sm:text-base mb-8">
              "Built for creators, powered by simplicity."
            </p>
          </FloatingElement>

          <FloatingElement delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative bg-white text-blue-900 
                hover:bg-blue-50 px-8 py-4 rounded-full 
                shadow-2xl shadow-blue-900/25 transition-all duration-300 hover:scale-105 
                hover:shadow-white/20 font-semibold text-lg min-w-64">
                <span className="relative z-10">Create Your First Invoice</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/5 to-blue-900/0 
                  rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="group bg-white/10 backdrop-blur border border-white/20 text-white 
                px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/20 
                hover:scale-105 font-semibold text-lg min-w-48">
                Watch Demo
                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </FloatingElement>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto">
          <FloatingElement delay={800}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16">
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
        </div>

        {/* CTA Section */}
        <FloatingElement delay={1200}>
          <div className="text-center mt-20 py-16">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Ready to streamline your invoicing?
              </h3>
              <p className="text-blue-50/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who've simplified their billing process with InvoiceEase.
              </p>
              <button className="bg-white text-blue-900 hover:bg-blue-50 
                px-12 py-4 rounded-full shadow-2xl shadow-blue-900/25 
                transition-all duration-300 hover:scale-105 font-bold text-lg">
                Get Started Free
              </button>
            </div>
          </div>
        </FloatingElement>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}