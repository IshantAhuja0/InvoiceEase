import { initFlowbite } from 'flowbite';
import './App.css'
import 'flowbite';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './main-components/Layout';
import Templates from './components/Templates';
import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          Add more nested routes here
     <Route path="/templates" element={<Templates />} />
     <Route path="/invoiceform" element={<InvoiceForm />} /> 
        </Route>
        {/* Define other routes that don't use the layout outside the Layout Route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;


      //   <Route path="/" element={<Layout />}>
      //     Add more nested routes here
      // // <Route index element={<Home />} /> {/* Default child route for / */}
      // // <Route path="about" element={<About />} />
      // // <Route path="dashboard" element={<Dashboard />} /> 
      //   </Route>