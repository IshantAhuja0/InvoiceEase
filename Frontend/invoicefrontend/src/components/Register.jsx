import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    // Just simulate success, no backend call
    alert("✅ Registration Successful!");
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-white p-6">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4 leading-tight">
       Join InvoiceEase Today! 💼


        </h2>
        <p className="text-center text-gray-500 text-sm italic mb-6">
          Join InvoiceEase — Simplify billing like a pro 
        </p>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 border border-blue-300 rounded-xl shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="🧑‍💼 Name"
            required
          />
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-5 py-3 border border-blue-300 rounded-xl shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="📱 Mobile Number"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border border-blue-300 rounded-xl shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="📧 Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 border border-blue-300 rounded-xl shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="🔒 Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-5 py-3 border border-blue-300 rounded-xl shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="🔒 Confirm Password"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg transition"
          >
            ✍️ Register Now
          </button>
        </form>
        <br></br>
 <p className="text-center ">
        Don’t have an account?{" "}
        <a href="/login"className="underline  hover:text-blue-900">Login</a>
        
       
      </p>
      </div>
    </div>
  );
}
