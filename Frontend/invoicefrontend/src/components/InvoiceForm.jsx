import { InvoiceContext } from "../../Context/InvoiceContext";
import React, { useState, useContext } from "react";
import { useNavigate,Navigate } from "react-router-dom";

import { motion } from "framer-motion";
const InvoiceForm = () => {
  const {
    items,
    setItems,
    firmInfo,
    setFirmInfo,
    customerInfo,
    setCustomerInfo,
    invoiceMeta,
    setInvoiceMeta,
  } = useContext(InvoiceContext);
  const handleChangeInvoiceMeta = (e) => {
    const { name, value } = e.target;
    setInvoiceMeta({ ...invoiceMeta, [name]: value });
  };
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0, tax: 0 }]);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const removeItem = (indexToRemove) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== indexToRemove));
  };

  const calculateTotal = (item) => {
    const subtotal = item.quantity * item.price;
    const taxAmount = (subtotal * item.tax) / 100;
    return subtotal + taxAmount;
  };

  const handleChangeFirmInfo = (e) => {
    const { name, value } = e.target;
    setFirmInfo({ ...firmInfo, [name]: value });
  };

  const handleChangeCustomerInfo = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

let nav=useNavigate();
  function generateInvoice(){
nav('/bill')
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10 bg-white shadow-xl rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-950">
        Create Invoice
      </h1>

      {/* Firm & Customer */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Firm */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Your Firm
          </h2>
          <div className="space-y-4">
            {[
              {
                label: "Business Name",
                name: "firmName",
                placeholder: "Your Business",
              },
              {
                label: "Address",
                name: "firmAddress",
                placeholder: "123 Street, City",
              },
              {
                label: "GSTIN / Tax ID",
                name: "firmGstin",
                placeholder: "GSTIN / PAN",
              },
              {
                label: "Email",
                name: "firmEmail",
                placeholder: "email@firm.com",
                type: "email",
              },
              {
                label: "Phone",
                name: "firmPhone",
                placeholder: "+91-9876543210",
                type: "tel",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  value={firmInfo[field.name]}
                  onChange={handleChangeFirmInfo}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                  className="w-full bg-blue-100 rounded-md p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Customer */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Customer</h2>
          <div className="space-y-4">
            {[
              {
                label: "Customer Name",
                name: "customerName",
                placeholder: "Client Name",
              },
              {
                label: "Company",
                name: "customerFirm",
                placeholder: "Client Company",
              },
              {
                label: "Address",
                name: "customerAddress",
                placeholder: "Client Address",
              },
              {
                label: "Email",
                name: "customerEmail",
                placeholder: "client@email.com",
                type: "email",
              },
              {
                label: "Phone",
                name: "customerPhone",
                placeholder: "+91-9123456789",
                type: "tel",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  value={customerInfo[field.name]}
                  onChange={handleChangeCustomerInfo}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                  className="w-full bg-blue-100 rounded-md p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <input
          className="w-full p-2 bg-blue-100 rounded-md"
          name="invoiceNo"
          value={invoiceMeta.invoiceNo}
          onChange={handleChangeInvoiceMeta}
          placeholder="Invoice Number"
          required
        />
        <input
          className="w-full p-2 bg-blue-100 rounded-md"
          name="date"
          value={invoiceMeta.date}
          onChange={handleChangeInvoiceMeta}
          type="date"
          required
        />
      </div>

      {/* Invoice Items */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">
          Invoice Items
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Add services/products below. You can add or remove items.
        </p>

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
              <button
                onClick={() => removeItem(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ✖
              </button>

              {["description", "quantity", "price", "tax"].map((field, i) => (
                <div className="flex flex-col" key={i}>
                  <label className="text-sm text-gray-600 font-medium capitalize">
                    {field === "description"
                      ? "Description"
                      : field === "price"
                      ? "Unit Price"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    className="p-2 rounded-md bg-white border"
                    placeholder={
                      field === "description"
                        ? "e.g., Wedding Shoot"
                        : field === "price"
                        ? "₹"
                        : field === "tax"
                        ? "%"
                        : "Qty"
                    }
                    type={
                      ["quantity", "price", "tax"].includes(field)
                        ? "number"
                        : "text"
                    }
                    min={
                      ["quantity", "price", "tax"].includes(field)
                        ? 0
                        : undefined
                    }
                    value={item[field]}
                    onChange={(e) =>
                      handleChange(
                        index,
                        field,
                        field === "description"
                          ? e.target.value
                          : Number(e.target.value)
                      )
                    }
                  />
                </div>
              ))}
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

      {/* Notes */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">
          Notes / Terms
        </h2>
        <textarea
          className="w-full h-28 p-2 bg-blue-100 rounded-md"
          placeholder="Thank you for your business! Payment is due within 15 days."
        ></textarea>
      </div>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-full sm:w-1/2 md:w-1/3">
          <div className="flex justify-between py-1">
            <span>Subtotal:</span>
            <span>
              ₹
              {items
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>Tax Total:</span>
            <span>
              ₹
              {items
                .reduce(
                  (acc, item) =>
                    acc + (item.quantity * item.price * item.tax) / 100,
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg py-2 border-t">
            <span>Total:</span>
            <span>
              ₹
              {items
                .reduce((acc, item) => acc + calculateTotal(item), 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="text-center mt-10">
        <button
          onClick={generateInvoice}
          className="bg-blue-950 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-900 transition-all duration-300 w-full sm:w-auto"
        >
          Generate Invoice
        </button>
      </div>
    </motion.div>
  );
};

export default InvoiceForm;
