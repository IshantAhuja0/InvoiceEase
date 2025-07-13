import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TemplateContext from "../../../Context/TemplateContext";
import { Themes } from "../Generic/Themes";
import { IoMdAddCircleOutline } from "react-icons/io";

const Templates = () => {
  const navigate = useNavigate();
  const { setTemplate, isTemplateReady, setIsTemplateReady } = useContext(TemplateContext);

  const handleSelect = (key) => {
    const selected = Themes[key];
    if (!selected) return;

    setTemplate({ theme: selected.theme, id: key });
  };

  useEffect(() => {
    if (isTemplateReady) {
      navigate("/invoiceform");
      setIsTemplateReady(false);
    }
  }, [isTemplateReady, navigate, setIsTemplateReady]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 px-6 py-12 text-blue-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Choose a Template
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(Themes).map(([key, { name, src }]) => (
            <div
              key={key}
              onClick={() => handleSelect(key)}
              className="group rounded-2xl bg-white overflow-hidden border border-gray-200 shadow hover:shadow-xl cursor-pointer transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={src}
                  alt={`${name} Template`}
                  className="w-full h-52 object-cover group-hover:opacity-90 transition duration-300"
                />
                <div className="absolute top-2 right-2 bg-blue-100 p-2 rounded-full text-blue-800 shadow">
                  <IoMdAddCircleOutline size={24} />
                </div>
              </div>
              <div className="px-5 py-4">
                <h3 className="text-xl font-semibold mb-1">{name}</h3>
                <p className="text-sm text-gray-600">
                  Sleek and professional layout for all business needs.
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-sm text-gray-500">
          Need more templates?{" "}
          <span className="underline cursor-pointer hover:text-blue-700">
            Contact Us
          </span>
        </p>
      </div>
    </div>
  );
};

export default Templates;
