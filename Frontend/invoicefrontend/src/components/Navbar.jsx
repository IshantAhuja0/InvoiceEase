import React, { useEffect, useRef, useState } from 'react';
import { LogOut, User } from 'lucide-react';

export default function Navbar({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full border-b border-gray-200 text-white shadow-sm fixed top-0 left-0 z-50 bg-blue-950">
      <div className="flex h-16 items-center justify-between px-2 sm:px-6 lg:px-8">

        {/* Sidebar Toggle + Brand */}
        <div className="flex items-center">
          <div className="block md:hidden pr-2">
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center p-2 text-gray-300 hover:bg-blue-900 hover:text-white rounded-lg focus:outline-none"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <img
              className="h-12 rounded-2xl sm:block hidden"
              src="https://i.postimg.cc/xdWwQqtR/Invoice-Ease.png"
              alt="Logo"
            />
            <span className="text-2xl font-semibold text-white">InvoiceEase</span>
          </div>
        </div>

        {/* User Info + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">invoiceEase_user</p>
              <p className="text-xs text-gray-300">invoiceEase_user@gamail.com</p>
            </div>
            <img
              src="https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png"
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover border-2 border-white hover:ring-2 hover:ring-blue-300"
            />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-sm text-gray-800 z-50">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => {
                  setDropdownOpen(false);
                  alert("Go to Profile Page");
                }}
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition text-red-600"
                onClick={() => {
                  setDropdownOpen(false);
                  alert("Logging out...");
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
