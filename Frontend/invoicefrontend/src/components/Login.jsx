import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const navigate=useNavigate()
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Clear previous error

  if (!email || !password) {
    setError("❗ Please fill in both fields.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    console.log("✅ HTTP Status:", response.status);
    console.log("✅ Message:", response.data.message);

    // Login success
    alert("✅ Login successful!");

    // Save token to localStorage or context
localStorage.setItem("user data", JSON.stringify({
    email: email,
    token: response.data.token
}));


    // Optionally redirect or navigate to dashboard
    // navigate("/dashboard");
    navigate("/invoices")

  } catch (error) {
    if (error.response) {
      // Backend returned a response (error HTTP status)
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
      // Request was made but no response received (e.g. network error)
      console.log("❌ No response from server:", error.request);
      setError("❗ Server not responding. Please try again later.");
    } else {
      // Something else happened while setting up the request
      console.log("❌ Error:", error.message);
      setError("❗ An unexpected error occurred.");
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-6 font-sans">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <motion.h2
          className="text-4xl font-bold text-center text-blue-900 mb-2 select-none"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Login to InvoiceEase
        </motion.h2>

        <motion.p
          className="text-center text-blue-700 text-sm italic mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome back! Please enter your credentials.
        </motion.p>

        {error && (
          <motion.p
            className="mb-4 text-center text-red-600 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Email Field */}
        <motion.div
          className="relative mb-5"
          whileFocus={{ scale: 1.01 }}
        >
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-300 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
          />
        </motion.div>

        {/* Password Field */}
        <motion.div
          className="relative mb-6"
          whileFocus={{ scale: 1.01 }}
        >
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600" size={20} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-300 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
          />
        </motion.div>

        {/* Login Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg transition"
        >
          Login
        </motion.button>

        {/* Register Link */}
        <p className="mt-6 text-center font-medium text-blue-800">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="underline hover:text-blue-900 transition"
          >
            Register
          </a>
        </p>
      </motion.form>
    </div>
  );
}
