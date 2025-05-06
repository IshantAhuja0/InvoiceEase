import React from 'react'
import { useState } from 'react'
import './App.css'
import 'flowbite';
import { initFlowbite } from 'flowbite';

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Another from './components/another'

function App() {
  return (
    <>
      <Sidebar  />
    </>
  );
}

export default App
