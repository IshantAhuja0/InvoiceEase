import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Lock,
  ShieldCheck,
} from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("❗ Passwords do not match");
      return;
    }
    alert("✅ Registration Successful!");
  };

  const InputWithIcon = ({ icon: Icon, ...props }) => (
    <div className="flex items-center border border-blue-400 rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-700 transition">
      <Icon className="text-blue-700 mr-3 w-5 h-5" />
      <input
        className="w-full outline-none text-sm placeholder-blue-500"
        {...props}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700
 p-6">
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
          <InputWithIcon
            type="text"
            placeholder="Full Name"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputWithIcon
            type="tel"
            placeholder="Mobile Number"
            icon={Phone}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <InputWithIcon
            type="email"
            placeholder="Email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputWithIcon
            type="password"
            placeholder="Password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <InputWithIcon
            type="password"
            placeholder="Confirm Password"
            icon={ShieldCheck}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

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
