import { Navigate, useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Pencil, Loader2, Hourglass } from "lucide-react";
import { aiResponse } from "../../../utils/aiResponse";

const formTemplates = {
  "offer-letter-form": {
    title: "Offer Letter",
    description:
      "Provide detailed information to generate a professional offer letter.",
    fields: [
      "candidateName",
      "position",
      "startDate",
      "salary",
      "location",
      "benefits",
      "hrName",
      "hrEmail",
      "responseDeadline",
    ],
  },
  "internship-letter-form": {
    title: "Internship Letter",
    description:
      "Fill in the required details to generate an internship confirmation letter.",
    fields: [
      "candidateName",
      "position",
      "startDate",
      "duration",
      "location",
      "mentorName",
    ],
  },
  "experience-letter-form": {
    title: "Experience Letter",
    description:
      "Provide past employment details for generating an experience certificate.",
    fields: ["candidateName", "position", "startDate", "endDate", "location"],
  },
  "promotion-letter-form": {
    title: "Promotion Letter",
    description:
      "Fill in promotion details to generate a formal promotion letter.",
    fields: [
      "candidateName",
      "position",
      "promotionDate",
      "newSalary",
      "location",
    ],
  },
};

const initialState = {
  logo: null,
  companyName: "",
  candidateName: "",
  position: "",
  startDate: "",
  endDate: "",
  duration: "",
  salary: "",
  newSalary: "",
  location: "",
  benefits: "",
  promotionDate: "",
  hrName: "",
  hrEmail: "",
  responseDeadline: "",
  mentorName: "",
  letterContent: "",
};

export default function DocumentForm() {
  const { type } = useParams();
  const formMeta = formTemplates[type];
  const [formData, setFormData] = useState(initialState);
  const [mode, setMode] = useState("manual");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  if (!formMeta) {
    return (
      <p className="text-red-600 text-center mt-20">Invalid document type.</p>
    );
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "logo" ? files[0] : value,
    });
  };

  const handleGenerateAIContent = async () => {
    setLoading(true);
    try {
      const content = await aiResponse(formData, type);
      setFormData((prev) => ({ ...prev, letterContent: content }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (name, label, type = "text") => (
    <div key={name} className="mb-4">
      <label className="block text-base text-gray-700 font-semibold mb-2">
        {label}
      </label>

      <input
      required
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
  const handleSubmit=(e)=>{
  e.preventDefault();
    navigate(`/documents/preview`,{
      state:{formData,type}
    })
  }
  

  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-md mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold text-blue-900 mb-2">
        {formMeta.title}
      </h1>
      <p className="text-gray-600 mb-6">{formMeta.description}</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {renderInput("companyName", "Company Name")}

        <div className="mb-4">
          <label className="block text-base text-gray-700 font-semibold mb-2">
            Company Logo
          </label>
          <div className="relative w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        {formMeta.fields.map((field) => {
          const labelMap = {
            candidateName: "Candidate Name",
            // companyName: "Company Name",
            position: "Position",
            startDate: "Start Date",
            endDate: "End Date",
            duration: "Duration",
            salary: "Offered Salary",
            newSalary: "New Salary",
            location: "Work Location",
            benefits: "Benefits",
            promotionDate: "Promotion Date",
            hrName: "HR Contact Name",
            hrEmail: "HR Email",
            responseDeadline: "Response Deadline",
            mentorName: "Mentor Name",
          };
          return renderInput(
            field,
            labelMap[field] || field,
            field.includes("Date") ? "date" : "text"
          );
        })}

        <div className="flex gap-4 mt-6">
          {/* Manual Mode Button */}
          <button
            type="button"
            onClick={() => setMode("manual")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition font-medium ${
              mode === "manual"
                ? "bg-blue-900 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            <Pencil className="h-4 w-4" />
            Write Manually
          </button>

          {/* AI Mode Button */}
          <button
            type="button"
            onClick={() => {
              setMode("ai");
              handleGenerateAIContent();
            }}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold shadow-md border transition-transform transform ${
              mode === "ai"
                ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white"
                : "bg-white text-purple-700 border-purple-400 hover:bg-purple-50"
            } hover:scale-105 hover:shadow-lg`}
          >
            <Bot className="h-5 w-5" />
            Generate with AI
            <span className="ml-1 px-2 py-0.5 text-[10px] font-bold bg-white text-purple-700 rounded-full border border-purple-300">
              AI
            </span>
          </button>
        </div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full mt-6 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl p-6 shadow-lg"
          >
            {/* Glowing circular spinner with bot icon */}
            <div className="relative w-16 h-16 mb-4">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-l-blue-400 border-b-transparent border-r-transparent shadow-lg"
              />
              <motion.div
                initial={{ opacity: 0.6, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
                className="absolute inset-1 rounded-full bg-gradient-to-br from-white to-blue-50 shadow-inner flex items-center justify-center"
              >
                <Bot className="text-blue-700 w-6 h-6 animate-pulse" />
              </motion.div>
            </div>

            <p className="text-blue-900 font-semibold text-base tracking-wide animate-pulse">
              Generating your document with AI...
            </p>
          </motion.div>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Letter Content
          </label>
          <textarea
            name="letterContent"
            value={formData.letterContent}
            onChange={handleChange}
            rows={8}
            className="w-full border border-gray-300 rounded-lg p-4 font-mono text-sm resize-y focus:ring-blue-500 focus:outline-none"
            placeholder="Write your letter content here..."
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Generate Document
          </button>
        </div>
      </form>
    </motion.div>
  );
}
