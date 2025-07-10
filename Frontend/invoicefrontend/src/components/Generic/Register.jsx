import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Phone, Mail, Lock, ShieldCheck, FileText,Eye,EyeOff } from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status,setStatus] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("❗ Passwords do not match");
      return;
    }

    const userDetail = { name, email, password, mobile };
    try {
              const baseurl = import.meta.env.VITE_BACKEND_BASE_URL;
        console.log("base" + baseurl);
      const res = await axios.post(
        `${baseurl}/register`,
        userDetail,
        {
          withCredentials: true,
        }
      );

      console.log("✅ HTTP status:", res.status);
      console.log("🟦 Message from server:", res.data.message);

      if (res.status === 201) {
        alert("✅ Registration Successful!");
        setStatus(201);
        setError("");
        login(email);
        navigate("/templates");
      }
    } catch (err) {
      const status = err.response?.status || 500;
      const message = err.response?.data?.message || "Something went wrong";

      console.log("❌ HTTP Error Status:", status);
      setStatus(status);
      setError(message);

      if (status === 409) {
        setError("⚠️ User already exists. Login or create a new account.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-100 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27%3E%3Crect x=%270%27 y=%270%27 width=%2740%27 height=%2740%27 fill=%27%23f3f4f6%27/%3E%3Cpath d=%27M0 0h40v1H0zM0 39h40v1H0zM0 0v40h1V0zM39 0v40h1V0z%27 fill=%27%23e5e7eb%27/%3E%3C/svg%3E%27)] bg-repeat">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-lg border border-blue-200"
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
            Join InvoiceEase Today
          </motion.h2>
          <motion.p
            className="text-center text-blue-800 text-sm mb-4 sm:mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Simplify Billing like a pro.
          </motion.p>

          {error && (
            <motion.div
              className="mb-4 text-red-600 text-sm font-medium text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900"
                size={18}
              />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg bg-gradient-to-r from-white to-blue-50 text-sm placeholder-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900"
                size={18}
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg bg-gradient-to-r from-white to-blue-50 text-sm placeholder-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900"
                size={18}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg bg-gradient-to-r from-white to-blue-50 text-sm placeholder-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

 <div className="relative">
  <Lock
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900"
    size={18}
  />
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full pl-10 pr-10 py-2 border border-blue-300 rounded-lg bg-gradient-to-r from-white to-blue-50 text-sm placeholder-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-900 hover:text-blue-700"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

<div className="relative">
  <ShieldCheck
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900"
    size={18}
  />
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    className="w-full pl-10 pr-10 py-2 border border-blue-300 rounded-lg bg-gradient-to-r from-white to-blue-50 text-sm placeholder-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-900 hover:text-blue-700"
  >
    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>


            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-lg font-medium shadow-md transition"
            >
              Register Now
            </motion.button>
          </form>

          <p className="mt-4 sm:mt-6 text-center text-blue-800 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline hover:text-blue-900">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
