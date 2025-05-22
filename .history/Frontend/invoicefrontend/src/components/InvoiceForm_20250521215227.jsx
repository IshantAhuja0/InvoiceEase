import { X } from "lucide-react"; // Optional: Icon from lucide-react
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

const removeItem = (indexToRemove) => {
  setItems((prevItems) => prevItems.filter((_, i) => i !== indexToRemove));
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

      {/* Firm Details Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Your Firm */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Your Firm</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-40 font-medium">Business Name:</label>
              <input className="input flex-1 p-2" required placeholder="Your Business" />
            </div>
            <div className="flex items-center">
              <label className="w-40 font-medium">Address:</label>
              <input className="input flex-1 p-2" required placeholder="123 Street, City" />
            </div>
            <div className="flex items-center">
              <label className="w-40 font-medium">GSTIN / Tax ID:</label>
              <input className="input flex-1 p-2" placeholder="GSTIN / PAN" />
            </div>
            <div className="flex items-center">
              <label className="w-40 font-medium">Email:</label>
              <input className="input flex-1 p-2" type="email" required placeholder="email@firm.com" />
            </div>
            <div className="flex items-center">
              <label className="w-40 font-medium">Phone:</label>
              <input className="input flex-1 p-2" type="tel" required placeholder="+91-9876543210" />
            </div>
          </div>
        </div>

        {/* Customer */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Customer</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-40 font-medium">Customer Name:</label>
              <input className="input flex-1 p-2" required placeholder="Client Name" />
            </div>
            <div className="flex items-center">
              <label className="w-40 font-medium">Company:</label>
              <input className="input flex-1 p-2" placeholder="Client Company" />
            </div>
            <div className="flex items-center">
              <label className="w-40 font-medium">Address:</label>
              <input className="input flex-1 p-2" required placeholder="Client Address" />
            </div>
            <div className="flex items-center">
              <label className="w-40 font-medium">Email:</label>
              <input className="input flex-1 p-2 " type="email" placeholder="client@email.com" />
            </div>
            <div className="flex items-center">
              <label className="w-40 font-medium">Phone:</label>
              <input className="input flex-1 p-2" type="tel" placeholder="+91-9123456789" />
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="grid sm:grid-cols-3 gap-6 mb-10 p-2">
        <input className="input" placeholder="Invoice Number" required />
        <input className="input" type="date" placeholder="Invoice Date" required />
        <input className="input" type="date" placeholder="Due Date" required />
      </div>

      {/* Items Section */}
<div className="mb-10">
  <h2 className="text-xl font-semibold mb-2 text-blue-900">Invoice Items</h2>
  <p className="text-sm text-gray-600 mb-4">
    Enter all the products or services you are billing for. You can add as many items as needed.
  </p>

  {/* Column Labels */}
  <div className="hidden md:grid grid-cols-5 gap-4 text-sm text-gray-600 px-4 pb-2">
    <span className="col-span-2">Description</span>
    <span>Quantity</span>
    <span>Unit Price (₹)</span>
    <span>Tax (%)</span>
  </div>

  <div className="space-y-6">
   {items.map((item, index) => (
  <motion.div
    key={index}
    className="relative grid sm:grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg border"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
  >
    {/* Delete button (top-right corner) */}
    <button
      onClick={() => removeItem(index)}
      className="absolute top-2 right-2 text-sm text-red-600 hover:text-red-800"
      title="Remove Item"
    >
      ✖
    </button>

    {/* Description */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600">Description</label>
      <input
        className="input"
        placeholder="e.g., Wedding Shoot"
        value={item.description}
        onChange={(e) => handleChange(index, "description", e.target.value)}
        required
      />
    </div>

    {/* Quantity */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600">Quantity</label>
      <input
        className="input"
        type="number"
        min="1"
        placeholder="Qty"
        value={item.quantity}
        onChange={(e) => handleChange(index, "quantity", Number(e.target.value))}
      />
    </div>

    {/* Unit Price */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600">Unit Price</label>
      <input
        className="input"
        type="number"
        placeholder="₹"
        value={item.price}
        onChange={(e) => handleChange(index, "price", Number(e.target.value))}
      />
    </div>

    {/* Tax % */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600">Tax %</label>
      <input
        className="input"
        type="number"
        placeholder="%"
        value={item.tax}
        onChange={(e) => handleChange(index, "tax", Number(e.target.value))}
      />
    </div>
  </motion.div>
))}

    <button
      className="text-blue-900 border border-blue-900 px-4 py-2 rounded-md hover:bg-blue-100 transition w-fit"
      onClick={addItem}
    >
      + Add Another Item
    </button>
  </div>
</div>


      {/* Notes Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-blue-900">Notes / Terms</h2>
        <textarea
          className="input w-full h-28"
          placeholder="Thank you for your business! Payment is due within 15 days."
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

      {/* Generate Button */}
      <div className="text-center mt-10">
        <button className="bg-blue-950 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-900 transition-all duration-300">
          Generate Invoice
        </button>
      </div>
    </motion.div>
  );
};

export default InvoiceForm;
