import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, Mail, Lock, ShieldCheck } from "lucide-react";
import axios from "axios"
export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError("❗ Passwords do not match");
    return;
  }

  const user = { name, email, password, mobile };
  console.log(user);

try {
  const res = await axios.post("http://localhost:5000/register", user);
  
  console.log("✅ HTTP status:", res.status);       // This shows 201 if successful
  console.log("🟦 Message from server:", res.data.message);
  
  if (res.status === 201) {
    alert("✅ Registration Successful!");
    setStatus(201);
    setError(""); // clear error
  }

} catch (err) {
  const status = err.response?.status || 500;
  const message = err.response?.data?.message || "Something went wrong";

  console.log("❌ HTTP Error Status:", status); // This shows 409 if already exists

  setStatus(status);
  setError(message);

  if (status === 404) {
    setError("⚠️ User already exists. Login or create a new account.");
  }
}


};

    

  const inputClasses =
    "w-full pl-10 pr-4 py-3 border border-blue-400 rounded-xl bg-white text-sm placeholder-blue-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 transition";

  const iconClasses =
    "absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700 w-5 h-5";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">
          Join InvoiceEase Today
        </h2>
        <p className="text-center text-blue-700 text-sm italic mb-6">
          Simplify billing like a pro.
        </p>

        {error && (
          <motion.div
            className="mb-4 text-red-600 font-semibold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className={iconClasses} />
            <input
              type="text"
              placeholder="Full Name"
              className={inputClasses}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Phone className={iconClasses} />
            <input
              type="tel"
              placeholder="Mobile Number"
              className={inputClasses}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Mail className={iconClasses} />
            <input
              type="email"
              placeholder="Email"
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className={iconClasses} />
            <input
              type="password"
              placeholder="Password"
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <ShieldCheck className={iconClasses} />
            <input
              type="password"
              placeholder="Confirm Password"
              className={inputClasses}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg transition"
          >
            Register Now
          </motion.button>
        </form>

        <p className="mt-6 text-center text-blue-800 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-blue-900">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
