import React from 'react';

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Sidebar toggle + Brand */}
        <div className="flex items-center gap-4">
          {/* Toggle button (for mobile) */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-gray-500 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <span className="text-lg font-semibold text-gray-700 hidden sm:block">Dashboard</span>
        </div>

        {/* Right: User Info */}
        <div className="flex items-center gap-4">
          <div className="hidden text-sm text-gray-600 md:block">
            <p className="font-medium">Eric Frusciante</p>
            <p className="text-xs">eric@frusciante.com</p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40"
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
