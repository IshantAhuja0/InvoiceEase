import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    date: '',
    dueDate: '',
    clientName: '',
    clientEmail: '',
    items: [{ description: '', quantity: 1, price: 0 }],
  });

  const handleChange = (e, index = null, field = null) => {
    if (index !== null) {
      const updatedItems = [...formData.items];
      updatedItems[index][field] = e.target.value;
      setFormData({ ...formData, items: updatedItems });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0 }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  return (
<div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg">
  <h2 className="text-3xl font-bold mb-6 text-center">Invoice Form</h2>

  {/* Company Details */}
  <div className="grid sm:grid-cols-2 gap-6 mb-8">
    <div>
      <h3 className="text-xl font-semibold mb-2">Your Firm</h3>
      <input className="input" placeholder="Business Name" />
      <input className="input" placeholder="Address" />
      <input className="input" placeholder="GSTIN / Tax ID" />
      <input className="input" placeholder="Email" />
      <input className="input" placeholder="Phone" />
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-2">Customer</h3>
      <input className="input" placeholder="Customer Name" />
      <input className="input" placeholder="Company Name" />
      <input className="input" placeholder="Address" />
      <input className="input" placeholder="Email" />
      <input className="input" placeholder="Phone" />
      <input className="input" placeholder="GSTIN (optional)" />
    </div>
  </div>

  {/* Invoice Meta */}
  <div className="grid sm:grid-cols-3 gap-4 mb-6">
    <input className="input" placeholder="Invoice Number" />
    <input type="date" className="input" placeholder="Invoice Date" />
    <input type="date" className="input" placeholder="Due Date" />
  </div>

  {/* Line Items */}
  <h3 className="text-xl font-semibold mb-2">Items</h3>
  <table className="w-full text-sm border mb-4">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 border">Description</th>
        <th className="p-2 border">Qty</th>
        <th className="p-2 border">Unit Price</th>
        <th className="p-2 border">Tax (%)</th>
        <th className="p-2 border">Total</th>
      </tr>
    </thead>
    <tbody>
      {/* Map through line items here */}
      <tr>
        <td className="p-2 border"><input className="input" /></td>
        <td className="p-2 border"><input className="input" /></td>
        <td className="p-2 border"><input className="input" /></td>
        <td className="p-2 border"><input className="input" /></td>
        <td className="p-2 border"><input className="input" disabled /></td>
      </tr>
    </tbody>
  </table>

  {/* Summary */}
  <div className="flex justify-end gap-6 mb-6">
    <div className="w-full sm:w-1/3">
      <div className="flex justify-between py-1">
        <span>Subtotal:</span>
        <span>₹0.00</span>
      </div>
      <div className="flex justify-between py-1">
        <span>Tax:</span>
        <span>₹0.00</span>
      </div>
      <div className="flex justify-between py-1">
        <span>Discount:</span>
        <span>₹0.00</span>
      </div>
      <div className="flex justify-between font-bold text-lg py-2 border-t">
        <span>Total:</span>
        <span>₹0.00</span>
      </div>
    </div>
  </div>

  {/* Notes & Terms */}
  <div className="mb-4">
    <textarea className="input w-full h-24" placeholder="Notes or terms & conditions"></textarea>
  </div>

  <button className="bg-blue-950 text-white px-6 py-2 rounded hover:bg-blue-900 transition">
    Generate Invoice
  </button>
</div>

  );
};

export default InvoiceForm;
