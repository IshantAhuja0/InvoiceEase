import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TemplateContext from "../../Context/TemplateContext";
import { invoiceThemes } from "../../Invoice Templates/invoiceThemes";
import { IoMdAddCircle } from "react-icons/io";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.03,
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const Templates = () => {
  const navigate = useNavigate();
  const { setTemplate, isTemplateReady, setIsTemplateReady } = useContext(TemplateContext);

  const handleSelect = (key) => {
    const selected = invoiceThemes[key];
    console.log(selected)
    if (!selected) return;

    setTemplate({
      theme: selected.theme,
      id: key,
    });
  };

  useEffect(() => {
    if (isTemplateReady) {

      navigate("/invoiceform");
      setIsTemplateReady(false);
    }
  }, [isTemplateReady, navigate, setIsTemplateReady]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-blue-900 mb-10"
        >
          Select Your Invoice Template
        </motion.h1>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {Object.keys(invoiceThemes).map((key, index) => {
              const { name, src } = invoiceThemes[key];
              return (
                <motion.div
                  key={key}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border border-gray-100"
                  onClick={() => handleSelect(key)}
                >
                  <motion.div variants={hoverVariants}>
                    <img
                      src={src}
                      alt={`${name} Preview`}
                      className="w-full h-48 object-cover transition-transform duration-300"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                        <IoMdAddCircle className="text-blue-900 text-2xl opacity-80 hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Professional and clean design for {name.toLowerCase()} invoices
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;