import React, { useState } from "react";
import { motion } from "framer-motion";

const InvoiceForm = () => {
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0, tax: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0, tax: 0 }]);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const calculateTotal = (item) => {
    const subtotal = item.quantity * item.price;
    const taxAmount = (subtotal * item.tax) / 100;
    return subtotal + taxAmount;
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-10 bg-white shadow-xl rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-950">
        Create Invoice
      </h1>

      {/* Sender and Receiver Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Firm</h2>
          <input className="input" placeholder="Business Name" required />
          <input className="input" placeholder="Address" required />
          <input className="input" placeholder="GSTIN / Tax ID" />
          <input className="input" placeholder="Email" required type="email" />
          <input className="input" placeholder="Phone" required type="tel" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Customer</h2>
          <input className="input" placeholder="Customer Name" required />
          <input className="input" placeholder="Company Name" />
          <input className="input" placeholder="Address" required />
          <input className="input" placeholder="Email" type="email" />
          <input className="input" placeholder="Phone" type="tel" />
        </div>
      </div>

      {/* Invoice Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <input className="input" placeholder="Invoice Number" required />
        <input className="input" type="date" placeholder="Invoice Date" required />
        <input className="input" type="date" placeholder="Due Date" required />
      </div>

      {/* Line Items */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-100 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <input
                className="input col-span-2"
                placeholder="Item Description"
                value={item.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                required
              />
              <input
                className="input"
                type="number"
                placeholder="Qty"
                value={item.quantity}
                min="1"
                onChange={(e) => handleChange(index, "quantity", Number(e.target.value))}
              />
              <input
                className="input"
                type="number"
                placeholder="Unit Price"
                value={item.price}
                onChange={(e) => handleChange(index, "price", Number(e.target.value))}
              />
              <input
                className="input"
                type="number"
                placeholder="Tax %"
                value={item.tax}
                onChange={(e) => handleChange(index, "tax", Number(e.target.value))}
              />
            </motion.div>
          ))}
          <button
            className="text-blue-900 border border-blue-900 px-4 py-2 rounded-md w-fit hover:bg-blue-100 transition"
            onClick={addItem}
          >
            + Add Item
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Notes / Terms</h2>
        <textarea
          className="input w-full h-28"
          placeholder="Thanks for your business! Terms and conditions..."
        ></textarea>
      </div>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-full sm:w-1/3">
          <div className="flex justify-between py-1">
            <span>Subtotal:</span>
            <span>
              ₹{items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>Tax Total:</span>
            <span>
              ₹{items
                .reduce(
                  (acc, item) => acc + (item.quantity * item.price * item.tax) / 100,
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg py-2 border-t">
            <span>Total:</span>
            <span>
              ₹{items.reduce((acc, item) => acc + calculateTotal(item), 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <button className="bg-blue-950 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-900 transition-all duration-300">
          Generate Invoice
        </button>
      </div>
    </motion.div>
  );
};

export default InvoiceForm;
