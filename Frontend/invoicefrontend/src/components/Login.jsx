import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, FileText } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const { user, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    if (!email || !password) {
      setError("❗ Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("✅ HTTP Status:", response.status);
      console.log("✅ Message:", response.data.message);

      sessionStorage.setItem("user data", JSON.stringify({ email }));
      login(email);
      navigate("/invoices");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;

        console.log("❌ Login error:", status, message);

        if (status === 401) {
          setError("❗ User not found. Invalid email!");
        } else if (status === 402) {
          setError("❗ Incorrect password!");
        } else {
          setError(`❗ ${message || "Internal Server Error"}`);
        }
      } else if (error.request) {
        console.log("❌ No response from server:", error.request);
        setError("❗ Server not responding. Please try again later.");
      } else {
        console.log("❌ Error:", error.message);
        setError("❗ An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27%3E%3Crect x=%270%27 y=%270%27 width=%2740%27 height=%2740%27 fill=%27%23f3f4f6%27/%3E%3Cpath d=%27M0 0h40v1H0zM0 39h40v1H0zM0 0v40h1V0zM39 0v40h1V0z%27 fill=%27%23e5e7eb%27/%3E%3C/svg%3E%27)] bg-repeat">


      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md border border-blue-200"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Decorative Icon */}
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-900 rounded-full p-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <FileText className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mt-6 mb-2 select-none"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Login to InvoiceEase
          </motion.h2>

          <motion.p
            className="text-center text-blue-800 text-sm mb-4 sm:mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome back! Generate invoices with ease.
          </motion.p>

          {error && (
            <motion.p
              className="mb-4 text-center text-red-600 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          {/* Email Field */}
          <motion.div className="relative mb-4" whileFocus={{ scale: 1.01 }} whileHover={{ scale: 1.01 }}>
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900"
              size={18}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-300 placeholder-blue-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 bg-gradient-to-r from-white to-blue-50 transition"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div className="relative mb-4 sm:mb-6" whileFocus={{ scale: 1.01 }} whileHover={{ scale: 1.01 }}>
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900"
              size={18}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-300 placeholder-blue-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 bg-gradient-to-r from-white to-blue-50 transition"
            />
          </motion.div>

          {/* Login Button */}
          <motion.button
            type="submit"
            onClick={handleSubmit}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 rounded-lg shadow-md transition"
          >
            Login
          </motion.button>

          {/* Register Link */}
          <p className="mt-4 sm:mt-6 text-center text-blue-800 text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="underline hover:text-blue-900 transition">
              Register
            </a>
          </p>
        </motion.div>
      </div>

    </div>
  );
}