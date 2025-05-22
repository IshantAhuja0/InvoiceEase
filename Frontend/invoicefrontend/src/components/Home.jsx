import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Create Invoices Easily",
    description: "Generate polished invoices in just a few clicks.",
    icon: "📄",
    color: "text-pink-500"
  },
  {
    title: "Stylish Templates",
    description: "Pick from hand-designed pastel styles.",
    icon: "🎨",
    color: "text-green-500"
  },
  {
    title: "Privacy First",
    description: "We protect your data with modern encryption.",
    icon: "🔒",
    color: "text-purple-500"
  },
  {
    title: "Instant PDF Export",
    description: "Download and share with ease.",
    icon: "📥",
    color: "text-blue-500"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-white py-12 px-6">
      <div className="text-center mb-16 max-w-3xl mx-auto">
      
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-400 text-transparent bg-clip-text drop-shadow-lg">
          InvoiceEase
        </h1>
        <p className="text-gray-700 text-xl mt-4">
          Send polished, professional invoices — no design skills required.
        </p>
        <p className="italic text-sm text-gray-500 mt-2">
          "Built for creators, powered by simplicity."
        </p>
        <button className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full shadow-lg transition">
          Create Your First Invoice
        </button>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition md:w-[90%] mx-auto"
          >
            <div className={`text-4xl ${feature.color}`} style={{textAlign:"center"}}>{feature.icon}</div>
            <h3 className="text-lg font-semibold text-green-700 mt-3 text-center ">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1 text-center">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
