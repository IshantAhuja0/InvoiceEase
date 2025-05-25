import React, { useContext } from "react";
import { InvoiceContext } from "../Context/InvoiceContext";

const ClassicBlue = () => {
  const { firmInfo, items, customerInfo, invoiceMeta } = useContext(InvoiceContext);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = items[0]?.tax || 0;
  const total = subtotal + (subtotal * taxRate) / 100;

  return (
    <div className="mt-2 p-4 sm:p-6 md:p-8 bg-white text-black font-sans max-w-4xl w-full mx-auto border border-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between text-sm mb-8 gap-4">
        <div>
          <div className="text-lg font-semibold">{firmInfo.firmName}</div>
          <div>{firmInfo.firmAddress}</div>
          <div>{firmInfo.firmPhone}</div>
          <div>{firmInfo.firmEmail}</div>
        </div>
        <div className="text-right">
          <div>Invoice #: {invoiceMeta.invoiceNo}</div>
          <div>Due Date: {invoiceMeta.date}</div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="text-sm mb-4">
        <div className="font-semibold">{customerInfo.customerName}</div>
        <div>{customerInfo.customerFirm}</div>
        <div>{customerInfo.customerAddress}</div>
        <div>{customerInfo.customerPhone}</div>
        <div>{customerInfo.customerEmail}</div>
      </div>

      {/* Table Header */}
      <div style={{ backgroundColor: '#2563EB', color: 'white' }} className="grid grid-cols-5 font-semibold text-sm">
        <div className="p-2 border">Quantity</div>
        <div className="p-2 border col-span-2">Description</div>
        <div className="p-2 border">Unit Price</div>
        <div className="p-2 border">Line Total</div>
      </div>

      {/* Table Rows */}
      {items.map((item, id) => (
        <div key={id} className="grid grid-cols-5 text-sm border-b border-l border-r">
          <div className="p-2 border-r">{item.quantity}</div>
          <div className="p-2 border-r col-span-2">{item.description}</div>
          <div className="p-2 border-r">{item.price.toFixed(2)}</div>
          <div className="p-2">{(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}

      {/* Totals */}
      <div className="flex justify-end text-sm mt-4">
        <div className="w-full sm:w-1/2 md:w-1/3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax ({taxRate}%)</span>
            <span>{((subtotal * taxRate) / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span
              style={{
                backgroundColor: '#2563EB',
                color: 'white',
                padding: '0 0.5rem',
                borderRadius: '0.25rem',
              }}
            >
              {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm mt-8 text-center">
        <p>Make all checks payable to {firmInfo.firmName}</p>
        <p style={{ color: '#2563EB' }} className="font-semibold mt-2">
          THANK YOU FOR YOUR BUSINESS!
        </p>
      </div>
    </div>
  );
};

export default ClassicBlue;
