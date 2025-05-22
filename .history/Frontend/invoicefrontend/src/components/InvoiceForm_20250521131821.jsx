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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Invoice Generator</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={formData.invoiceNumber}
          onChange={handleChange}
          className="input"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input"
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleChange}
          className="input"
        />
        <input
          type="email"
          name="clientEmail"
          placeholder="Client Email"
          value={formData.clientEmail}
          onChange={handleChange}
          className="input col-span-2"
        />
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold text-gray-700">Line Items</h2>

      {formData.items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-6 gap-2 mb-2 items-center"
        >
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleChange(e, index, 'description')}
            className="col-span-3 input"
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleChange(e, index, 'quantity')}
            className="input"
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleChange(e, index, 'price')}
            className="input"
          />
          <button
            onClick={() => removeItem(index)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        </motion.div>
      ))}

      <button
        onClick={addItem}
        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 mt-2"
      >
        + Add Item
      </button>

      <div className="mt-8 text-right">
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-all"
        >
          Generate Invoice
        </button>
      </div>
    </motion.div>
  );
};

export default InvoiceForm;
