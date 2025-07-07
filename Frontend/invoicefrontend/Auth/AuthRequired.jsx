import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
export default function AuthRequired({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowPopup(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [user]);

  const handleLogin = () => {
    navigate("/login", { state: { from: location } });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleClose = () => {
    navigate("/");
  };

  if (!user) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-900 rounded-full mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-900">Login Required</h2>
            <p className="text-gray-700 mt-3 text-base">
              To view and manage your invoices, please log in.
              <br />
              Your invoices are securely stored once you register.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleLogin}
                className="bg-blue-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-800 transition"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="border border-blue-900 text-blue-900 px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-50 transition"
              >
                Register
              </button>
            </div>

            <button
              onClick={handleClose}
              className="mt-6 text-sm text-gray-500 hover:text-blue-900 transition underline"
            >
              Cancel & Return to Home
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return children; 
}
