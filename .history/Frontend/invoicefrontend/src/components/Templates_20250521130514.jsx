import React from "react";
import { motion } from "framer-motion";
import { IoMdAddCircle } from "react-icons/io";
const templates = [
  {
    id: 1,
    name: "Classic Blue",
    src: "https://cdn4.geckoandfly.com/wp-content/uploads/2019/06/sales-services-invoice-18.jpg",
  },
  {
    id: 2,
    name: "Graphical Green",
    src: "https://www.invoiceberry.com/img/homepage/free_invoice_templates/new/countries/US.png",
  },
  {
    id: 3,
    name: "Bold",
    src: "https://th.bing.com/th/id/OIP.3WDtx3MVl_EUpzPF-DVEywHaKY?cb=iwc2&rs=1&pid=ImgDetMain",
  },
  {
    id: 4,
    name: "First",
    src: "https://images.template.net/943/Blank-Commercial-Invoice-Template.jpg",
  },
  {
    id: 5,
    name: "Modern Blue",
    src: "https://cdn.geckoandfly.com/wp-content/uploads/2019/06/sales-services-invoice-20.jpg",
  },
  {
    id: 6,
    name: "Minimal Gray",
    src: "https://assets-global.website-files.com/6253f6e60f27498e7d4a1e46/6271a4637b3b5d737a3b5865_Professional-Invoice-Template-1-P.jpeg",
  },
];

// Framer motion variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Templates() {
  return (
    <motion.div
      className="min-h-screen bg-white text-blue-950 py-12 px-4 sm:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <h1 className="text-3xl font-bold text-center mb-10">
        Choose Your Invoice Template
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg cursor-pointer flex flex-col"
            variants={cardVariants}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {/* Zoom-on-hover image */}
            <div className="overflow-hidden rounded-t-2xl">
              <motion.img
                src={template.src}
                alt={template.name}
                className="w-full h-52 object-cover"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            </div>

            {/* Card footer */}
            <div className="p-2 flex flex-col justify-between h-30">
              <h2 className="text-lg font-semibold m-2">{template.name}</h2>
              <button on className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition mt-auto flex items-center gap-1 justify-center">
                Create Invoice
                <IoMdAddCircle className="font-extrabold" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
