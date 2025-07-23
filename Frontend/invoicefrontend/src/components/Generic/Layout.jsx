// Layout.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar";
import { login } from "../../../Redux/Features/Auth/authSlice.js";
import { useDispatch } from "react-redux";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ✅ Wake up the server and check auth
  useEffect(() => {
    const baseurl = import.meta.env.VITE_BACKEND_URL;

    const pingAndAuth = async () => {
      try {
        console.log("🌐 Pinging server...");
        await fetch(baseurl); // Wake up Render server

        const res = await fetch(`${baseurl}/api/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
        console.log(data)
          if (data?.user?.email ) {
          // if (data?.user?.email && data?.user?.token) {

            //todo correct this when backend get fixed
            dispatch(login({ email: data.user.email, jwt: "data.user.token" }));
          } else {
            console.warn("⚠️ Incomplete user data:", data);
          }
        } else {
          console.log("⚠️ Not logged in");
        }
      } catch (error) {
        console.log("⚠️ Server may be waking up or offline:", error.message);
      }
    };

    // ✅ Invoke the function
    pingAndAuth();
  });

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
<Sidebar isOpen={isOpen} sidebarRef={sidebarRef} setIsOpen={setIsOpen} />


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
