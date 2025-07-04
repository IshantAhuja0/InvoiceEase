import React, { useContext, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, FileText, X, CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotOverlay, setShowForgotOverlay] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [mailOtp, setMailOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   if (!email || !password) {
  //     setError("Please fill in both email and password fields.");
  //     return;
  //   }

  //   try {
  //     const baseurl = import.meta.env.VITE_BACKEND_BASE_URL;
  //       console.log("base" + baseurl);
  //     const response = await axios.post(
  //       `${baseurl}/login`,
  //       { email, password },
  //       { withCredentials: true }
  //     );
  //     sessionStorage.setItem("user data", JSON.stringify({ email }));
  //     login(email);
  //     navigate("/invoices");
  //   } catch (error) {
  //     const message = error.response?.data?.message;
  //     setError(
  //       error.response
  //         ? error.response.status === 401
  //           ? "Invalid email address."
  //           : error.response.status === 402
  //           ? "Incorrect password."
  //           : message || "Authentication failed."
  //         : "Server connection error. Please try again."
  //     );
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double-clicks or rapid submissions

    setError("");
    setLoading(true); // start loading

    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      setLoading(false); // reset loading
      return;
    }

    try {
      const baseurl = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.post(
        `${baseurl}/login`,
        { email, password },
        { withCredentials: true }
      );
      sessionStorage.setItem("user data", JSON.stringify({ email }));
      login(email);
      navigate("/invoices");
    } catch (error) {
      const message = error.response?.data?.message;
      setError(
        error.response
          ? error.response.status === 401
            ? "Invalid email address."
            : error.response.status === 402
            ? "Incorrect password."
            : message || "Authentication failed."
          : "Server connection error. Please try again."
      );
    } finally {
      setLoading(false); // reset loading after success or failure
    }
  };

  const handleOTPChange = (e, idx) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < OTP_LENGTH - 1) {
      otpRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();
    if (!/^\d{1,6}$/.test(paste)) return;

    const newOtp = Array(OTP_LENGTH).fill("");
    paste
      .split("")
      .slice(0, OTP_LENGTH)
      .forEach((char, i) => {
        newOtp[i] = char;
      });
    setOtp(newOtp);
    otpRefs.current[Math.min(paste.length - 1, OTP_LENGTH - 1)]?.focus();
  };

  const sendOTP = async () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    try {
      const baseurl = import.meta.env.VITE_BACKEND_BASE_URL;
      console.log("base" + baseurl);
      const response = await axios.post(`${baseurl}/send-otp`, { email });
      setMailOtp(String(response.data.data));
      setShowForgotOverlay(true);
      setError("");
    } catch (error) {
      setError(
        error.response
          ? error.response.status === 404
            ? "Email not registered."
            : error.response.status === 401
            ? "Email is required."
            : error.response.status === 500
            ? "Server error. Please try again."
            : "Unexpected error occurred."
          : error.request
          ? "No server response. Check your connection."
          : `Error: ${error.message}`
      );
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== OTP_LENGTH) {
      setOtpError("Please enter all 6 digits.");
      return;
    }

    if (enteredOtp === mailOtp) {
      setShowForgotOverlay(false);
      setShowSuccessOverlay(true);
      setOtp(Array(OTP_LENGTH).fill(""));
      setOtpError("");
    } else {
      setOtpError("Incorrect OTP.");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const baseurl = import.meta.env.VITE_BACKEND_BASE_URL;
      console.log("base" + baseurl);
      await axios.post(`${baseurl}/reset-password`, {
        email,
        newPassword,
      });
      setShowSuccessOverlay(false);
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      alert("Password reset successfully!");
    } catch (error) {
      setError(
        error.response
          ? error.response.data.message || "Failed to reset password."
          : "Server connection error. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full border border-blue-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-blue-900 rounded-full p-3 w-12 h-12 flex items-center justify-center -mt-12 mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <FileText className="w-6 h-6 text-white" />
        </motion.div>

        <h2 className="text-2xl font-bold text-center text-blue-900 mt-6 mb-2">
          Login to InvoiceEase
        </h2>
        <p className="text-center text-blue-800 text-sm mb-4">
          Welcome back! Generate and store invoices.
        </p>

        {error && (
          <motion.p
            className="mb-4 text-center text-red-600 text-sm bg-red-50 p-2 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}

        <div className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900"
              size={18}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
              aria-label="Email address"
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900"
              size={18}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
              aria-label="Password"
            />
          </div>

          <p
            className="text-right text-sm text-blue-800 hover:underline cursor-pointer"
            onClick={sendOTP}
          >
            Forgot Password?
          </p>

          <motion.button
            onClick={handleSubmit}
            whileTap={{ scale: 0.98 }}
            whileHover={!loading ? { scale: 1.02 } : {}}
            disabled={loading}
            className={`w-full flex items-center justify-center py-2 rounded shadow-md transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-900 hover:bg-blue-800 text-white"
            }`}
          >
            {loading && <Spinner />}
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          <p className="text-center text-blue-800 text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="underline hover:text-blue-900">
              Register
            </a>
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForgotOverlay && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl max-w-md w-full relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                onClick={() => {
                  setShowForgotOverlay(false);
                  setOtp(Array(OTP_LENGTH).fill(""));
                  setOtpError("");
                }}
                aria-label="Close"
              >
                <X size={24} />
              </button>

              <h3 className="text-center text-lg font-semibold text-blue-900 mb-4">
                Enter 6-digit OTP sent to <br />
                <span className="font-mono text-blue-700">{email}</span>
              </h3>

              <div
                className="flex justify-center gap-2 mb-4"
                onPaste={handlePaste}
              >
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    ref={(ref) => (otpRefs.current[idx] = ref)}
                    value={digit}
                    onChange={(e) => handleOTPChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-12 h-12 text-center text-xl border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`OTP digit ${idx + 1}`}
                  />
                ))}
              </div>

              {otpError && (
                <motion.p
                  className="text-center text-red-600 text-sm bg-red-50 p-2 rounded mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {otpError}
                </motion.p>
              )}

              <motion.button
                onClick={handleVerifyOtp}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded"
              >
                Verify OTP
              </motion.button>

              <p className="text-center text-sm text-blue-800 mt-4">
                Didn’t get it?{" "}
                <span
                  onClick={sendOTP}
                  className="underline cursor-pointer hover:text-blue-900"
                >
                  Resend OTP
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl max-w-md w-full relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                onClick={() => {
                  setShowSuccessOverlay(false);
                  setNewPassword("");
                  setConfirmPassword("");
                  setError("");
                }}
                aria-label="Close"
              >
                Sessio
                <X size={24} />
              </button>

              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>

              <h3 className="text-center text-xl font-semibold text-blue-900 mb-4">
                OTP Verified Successfully!
              </h3>
              <p className="text-center text-blue-800 text-sm mb-4">
                Enter your new password below.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900"
                    size={18}
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full pl-10 pr-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    aria-label="New password"
                  />
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900"
                    size={18}
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    aria-label="Confirm password"
                  />
                </div>

                {error && (
                  <motion.p
                    className="text-center text-red-600 text-sm bg-red-50 p-2 rounded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  onClick={handleResetPassword}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded"
                >
                  Reset Password
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    ></path>
  </svg>
);
