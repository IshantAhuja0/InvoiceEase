// Layout.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when clicking outside (mobile only)
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
<div className="flex h-screen w-screen overflow-hidden">
  {/* Sidebar */}
  <Sidebar isOpen={isOpen} sidebarRef={sidebarRef} />

  {/* Right side: Navbar + Content */}
  <div className="flex flex-col flex-1 h-screen md:w32">
    <Navbar toggleSidebar={toggleSidebar} />

    {/* Main content area */}
    <main className="flex-1 overflow-y-auto p-4 bg-gray-50 lg:ml-64 lg:mt-16 ">
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default Layout;
