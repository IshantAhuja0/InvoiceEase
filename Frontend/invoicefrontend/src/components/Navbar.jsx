import React ,{useEffect, useRef, useState}from 'react';

export default function Navbar({toggleSidebar}) {

  return (
    <header className="w-full border-b border-gray-200 text-white shadow-sm fixed top-0 left-0 z-50 bg-blue-950" >
      <div className="flex h-16 items-center justify-between px-2 sm:px-6 lg:px-8">

<div className='flex'>

<div className='block md:hidden pr-2'>
        <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center ms-1 p-0  text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 h-11"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            clipRule="evenodd"
          />
        </svg>
      </button>
</div>

        {/* Left: Brand */}
        <div className="flex items-center gap-4">
        <img className='h-12 rounded-2xl sm:block hidden'  src='https://i.postimg.cc/xdWwQqtR/Invoice-Ease.png'/>
          <span className="text-2xl font-semibold text-white md:text-3xl sm:block ">InvoiceEase</span>
        </div>
</div>

        {/* Right: User Info */}
        <div className="flex items-center gap-4">
          <div className="hidden text-sm text-white md:block">
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