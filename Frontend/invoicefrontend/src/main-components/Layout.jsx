// Layout.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../../Context/AuthContext";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { user, login } = useContext(AuthContext);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ✅ Wake up the server and check auth
  useEffect(() => {
    const baseurl = "https://invoiceease-backend.onrender.com";

    const pingAndAuth = async () => {
      try {
        console.log("🌐 Pinging server...");
        await fetch(baseurl); // Wake up Render server

        const res = await fetch(`${baseurl}/api/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("✅ Logged in as:", data.user);
          login(data.user.email); // Make sure your login function supports this
        } else {
          console.log("⚠️ Not logged in");
        }
      } catch (error) {
        console.log("⚠️ Server may be waking up or offline:", error.message);
      }
    };

    // ✅ Invoke the function
    pingAndAuth();
  }, [login]);

  // 🔁 Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} sidebarRef={sidebarRef} />

      {/* Right side: Navbar + Content */}
      <div className="flex flex-col flex-1 h-screen">
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 mt-12 lg:ml-56 md:ml-48 sm:ml-48">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
