// src/components/NotFound.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function NotFound() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`min-h-screen bg-white flex items-center justify-center transition-opacity duration-700 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <div className="text-center px-6 py-12 max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <ExclamationTriangleIcon className="h-16 w-16 text-blue-900" />
        </div>
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">404</h1>
        <p className="text-lg text-blue-900 font-medium mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
