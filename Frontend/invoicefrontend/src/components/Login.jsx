import React, { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    if (!email || !password) {
      setError("Please fill both fields");
      return;
    }
    setError("");
    alert(`Welcome back, ${name}!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-white p-6 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-4 leading-tight select-none">
          🔐 Login
        </h2>
        <p className="text-center text-gray-500 text-sm italic mb-6">
          Welcome back! Please enter your credentials.
        </p>

        {error && (
          <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        <input
          type="email"
          placeholder="📧 E-mail"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-5 px-5 py-3 rounded-xl border border-blue-300 shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-5 py-3 rounded-xl border border-blue-300 shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition active:scale-95 select-none"
        >
          Login
        </button>

        <p className="mt-6 text-center font-medium">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="underline hover:text-blue-900"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
