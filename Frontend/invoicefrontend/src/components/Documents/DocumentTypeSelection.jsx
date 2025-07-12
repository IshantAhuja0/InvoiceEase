import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

const documentTypes = [
  {
    title: "Internship Letter",
    icon: <GraduationCap className="h-10 w-10 text-blue-700" />,
    route: "/documents/internship-letter-form",
    description: "Certify an intern's experience and duration.",
  },
  {
    title: "Offer Letter",
    icon: <Briefcase className="h-10 w-10 text-green-700" />,
    route: "/documents/offer-letter-form",
    description: "Formally offer a position to a candidate.",
  },
  {
    title: "Experience Letter",
    icon: <BadgeCheck className="h-10 w-10 text-amber-700" />,
    route: "/documents/experience-letter-form",
    description: "Confirm an employee's work history.",
  },
  {
    title: "Promotion Letter",
    icon: <TrendingUp className="h-10 w-10 text-purple-700" />,
    route: "/documents/promotion-letter-form",
    description: "Announce a promotion within the company.",
  },
];

export default function DocumentTypeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-10">
        Select Document Type
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {documentTypes.map((doc, index) => (
          <motion.div
            key={doc.title}
            onClick={() => navigate(doc.route)}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg cursor-pointer transition-all"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-xl">{doc.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {doc.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
