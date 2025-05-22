import React from "react";

const ClassicBlue = ({ invoiceData }) => {
  return (
    <div className="p-8 bg-white text-black font-sans max-w-4xl mx-auto border border-black">
      <div className="flex justify-between mb-4">
        <div>
          <div className="text-lg font-semibold">Logo Name</div>
          <div className="text-xs text-gray-500">[Your Company Slogan]</div>
        </div>
        <div className="text-4xl font-bold text-blue-600">INVOICE</div>
      </div>

      <div className="flex justify-between text-sm mb-8">
        <div>
          <div className="font-semibold">[Your Company Name]</div>
          <div>[Street Address]</div>
          <div>[City, State, ZIP Code]</div>
          <div>[Phone] [Fax]</div>
          <div>[e-mail]</div>
        </div>
        <div className="text-right">
          <div>Invoice No: [100]</div>
          <div>Date: 6/12/2019</div>
          <div>Customer ID: [ABC12345]</div>
        </div>
      </div>

      <div className="text-sm mb-4">
        <div className="font-semibold">[Name]</div>
        <div>[Company Name]</div>
        <div>[Street Address]</div>
        <div>[City, State, ZIP Code]</div>
        <div>[Phone]</div>
      </div>

      {/* <div className="grid grid-cols-4 text-white font-semibold text-sm bg-blue-600">
        <div className="p-2 border">Salesperson</div>
        <div className="p-2 border">Job</div>
        <div className="p-2 border">Payment Terms</div>
        <div className="p-2 border">Due Date</div>
      </div> */}
      <div className="grid grid-cols-4 text-sm border-b border-l border-r">
        <div className="p-2 border-r h-10"></div>
        <div className="p-2 border-r h-10"></div>
        <div className="p-2 border-r h-10"></div>
        <div className="p-2 h-10"></div>
      </div>

      <div className="grid grid-cols-5 text-white font-semibold text-sm bg-blue-600 mt-6">
        <div className="p-2 border">Quantity</div>
        <div className="p-2 border col-span-2">Description</div>
        <div className="p-2 border">Unit Price</div>
        <div className="p-2 border">Line Total</div>
      </div>

      {[...Array(10)].map((_, i) => (
        <div key={i} className="grid grid-cols-5 text-sm border-b border-l border-r">
          <div className="p-2 border-r h-8"></div>
          <div className="p-2 border-r col-span-2 h-8"></div>
          <div className="p-2 border-r h-8"></div>
          <div className="p-2 h-8"></div>
        </div>
      ))}

      <div className="flex justify-end text-sm mt-4">
        <div className="w-1/3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span> </span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax @ 9.50%</span>
            <span> </span>
          </div>
          <div className="flex justify-between font-bold text-blue-600">
            <span>TOTAL</span>
            <div className="bg-blue-600 w-24 h-6"></div>
          </div>
        </div>
      </div>

      <div className="text-sm mt-8 text-center">
        <p>Make all checks payable to [Your Company Name]</p>
        <p className="text-blue-600 font-semibold mt-2">THANK YOU FOR YOUR BUSINESS!</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
