import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvoiceContext } from "../Context/InvoiceContext";

const InvoiceTemplate = ({ theme, local }) => {
  let invoiceCtx = useContext(InvoiceContext);
  if(local)invoiceCtx=JSON.parse(localStorage.getItem("savedInvoice"))
  const [loading, setLoading] = useState(true);

  // Simulate loading for demo purposes (remove if data fetching is handled elsewhere)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1-second delay
    return () => clearTimeout(timer);
  }, []);

  // Fallback theme aligned with app's blue-900 color scheme
  const defaultTheme = {
    primaryColor: "#1e3a8a", // blue-900
    textColor: "#1f2937", // gray-800
    fontFamily: "Inter, sans-serif",
    accentColor: "#3b82f6", // blue-500
    borderColor: "#e5e7eb", // gray-200
  };

  const { primaryColor, textColor, fontFamily, accentColor, borderColor } = theme || defaultTheme;

  if (
    !invoiceCtx ||
    !invoiceCtx.firmInfo ||
    !invoiceCtx.items ||
    !invoiceCtx.customerInfo ||
    !invoiceCtx.invoiceMeta
  ) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "2.5rem",
          color: "#dc2626", // text-red-600
          fontWeight: "600",
        }}
      >
        ⚠️ Incomplete invoice data. Please fill all fields.
      </div>
    );
  }

  const { firmInfo, items, customerInfo, invoiceMeta } = invoiceCtx;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = items.reduce((acc, item) => acc + item.line_total, 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4 p-6">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-60 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-5 w-36 bg-gray-200 rounded"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
        <div className="h-4 w-60 bg-gray-200 rounded"></div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full border border-gray-200 rounded-lg">
          <div className="flex bg-blue-900 p-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-1 h-4 bg-gray-300 rounded m-1"></div>
            ))}
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex border-t border-gray-200">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="flex-1 h-4 bg-gray-100 rounded m-1"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="w-64 space-y-2 p-4 bg-gray-100 rounded-lg">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-5 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.5rem" }}
        >
          <SkeletonLoader />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            marginTop: "1rem",
            padding: "1.5rem",
            maxWidth: "80rem",
            width: "100%",
            margin: "0 auto",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "0.5rem",
            backgroundColor: "#ffffff",
            color: textColor,
            fontFamily,
            border: `1px solid ${borderColor}`,
          }}
          className="sm:p-6"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem",
              marginBottom: "2rem",
              fontSize: "0.875rem",
            }}
            className="sm:flex-row"
          >
            <div>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: primaryColor,
                }}
              >
                {firmInfo.firmName}
              </h1>
              <p style={{ color: "#4b5563" }}>{firmInfo.firmAddress}</p>
              <p style={{ color: "#4b5563" }}>{firmInfo.firmPhone}</p>
              <p style={{ color: "#4b5563" }}>{firmInfo.firmEmail}</p>
            </div>
            <div
              style={{
                textAlign: "right",
                color: "#374151",
              }}
            >
              <p>
                <span style={{ fontWeight: "600" }}>Invoice #:</span> {invoiceMeta.invoiceNo}
              </p>
              <p>
                <span style={{ fontWeight: "600" }}>Due Date:</span> {invoiceMeta.date}
              </p>
            </div>
          </motion.div>

          {/* Customer Info */}
          <motion.div
            variants={itemVariants}
            style={{
              marginBottom: "1.5rem",
              fontSize: "0.875rem",
              color: "#374151",
            }}
          >
            <h2 style={{ fontWeight: "600", fontSize: "1.125rem", marginBottom: "0.25rem" }}>
              {customerInfo.customerName}
            </h2>
            <p>{customerInfo.customerFirm}</p>
            <p>{customerInfo.customerAddress}</p>
            <p>{customerInfo.customerPhone}</p>
            <p>{customerInfo.customerEmail}</p>
          </motion.div>

          {/* Table Section */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                minWidth: "100%",
                border: `1px solid ${borderColor}`,
                fontSize: "0.875rem",
              }}
            >
              <thead style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                <tr>
                  <th
                    style={{
                      padding: "0.5rem",
                      textAlign: "left",
                      borderRight: "1px solid #ffffff",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      padding: "0.5rem",
                      textAlign: "left",
                      borderRight: "1px solid #ffffff",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      padding: "0.5rem",
                      textAlign: "left",
                      borderRight: "1px solid #ffffff",
                    }}
                  >
                    Unit Price
                  </th>
                  <th
                    style={{
                      padding: "0.5rem",
                      textAlign: "left",
                      borderRight: "1px solid #ffffff",
                    }}
                  >
                    Tax (%)
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "left" }}>Line Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <motion.tr
                    key={index}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                    }}
                  >
                    <td style={{ padding: "0.5rem", border: `1px solid ${borderColor}` }}>
                      {item.description}
                    </td>
                    <td style={{ padding: "0.5rem", border: `1px solid ${borderColor}` }}>
                      {item.quantity}
                    </td>
                    <td style={{ padding: "0.5rem", border: `1px solid ${borderColor}` }}>
                      {item.price.toFixed(2)}
                    </td>
                    <td style={{ padding: "0.5rem", border: `1px solid ${borderColor}` }}>
                      {item.tax}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem",
                        border: `1px solid ${borderColor}`,
                        fontWeight: "600",
                      }}
                    >
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "0.875rem",
              marginTop: "1.5rem",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "20rem",
                backgroundColor: "#f3f4f6",
                borderRadius: "0.375rem",
                padding: "1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>GST</span>
                <span>{(total - subtotal).toFixed(2)}</span>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "700",
                  fontSize: "1.125rem",
                  borderTop: `1px solid ${borderColor}`,
                  paddingTop: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                <span>Total</span>
                <span
                  style={{
                    backgroundColor: accentColor,
                    color: "#ffffff",
                    padding: "0 0.75rem",
                    borderRadius: "0.375rem",
                    fontWeight: "700",
                  }}
                >
                  {total.toFixed(2)}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              marginTop: "2.5rem",
              color: "#4b5563",
            }}
          >
            <p>
              Make all checks payable to <strong>{firmInfo.firmName}</strong>
            </p>
            <p
              style={{
                color: accentColor,
                fontWeight: "600",
                marginTop: "0.75rem",
              }}
            >
              THANK YOU FOR YOUR BUSINESS!
            </p>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InvoiceTemplate;