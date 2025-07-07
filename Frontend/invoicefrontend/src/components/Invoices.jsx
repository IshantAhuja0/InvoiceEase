import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { Search, Eye, Plus, DollarSign, FileText, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for testing if API is unavailable
const mockInvoices = [
  {
    _id: "1",
    invoiceMeta: {
      invoiceNo: "INV-001",
      paymentStatus: "paid",
      date: "2025-05-01",
    },
    customerInfo: { customerFirm: "Demo Invoice" },
    items: [{ id: 1, name: "Item 1", price: 500, tax: 10, quantity: 2 }],
    createdAt: "2025-05-01",
  },
  {
    _id: "2",
    invoiceMeta: {
      invoiceNo: "INV-002",
      paymentStatus: "pending",
      date: "2025-05-15",
    },
    customerInfo: { customerFirm: "Demo Invoice" },
    items: [{ id: 3, name: "Item 3", price: 500, tax: 0, quantity: 1 }],
    createdAt: "2025-05-15",
  },
];

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate invoice amount
  const calculateInvoiceAmount = (items) =>
    items?.length
      ? items
          .reduce(
            (sum, item) => sum + (item.price || 0) * (1 + (item.tax || 0) / 100) * (item.quantity || 1),
            0
          )
          .toFixed(2)
      : "0.00";

  // Memoized filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const firmName = invoice.customerInfo?.customerFirm?.toLowerCase() || "";
      const invoiceNo = invoice.invoiceMeta?.invoiceNo?.toLowerCase() || "";
      const status = invoice.invoiceMeta?.paymentStatus?.toLowerCase() || "";
      const matchesSearch =
        firmName.includes(debouncedSearchTerm.toLowerCase().trim()) ||
        invoiceNo.includes(debouncedSearchTerm.toLowerCase().trim());
      const matchesStatus =
        statusFilter === "all" || status === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [invoices, debouncedSearchTerm, statusFilter]);

  // Calculate totals for stats cards
  const totals = useMemo(() => {
    const totals = filteredInvoices.map((invoice) =>
      Number(calculateInvoiceAmount(invoice.items))
    );
    const totalAmount = totals.reduce((sum, val) => sum + val, 0) || 0;

    const paidTotals = filteredInvoices
      .filter(
        (invoice) => invoice.invoiceMeta?.paymentStatus?.toLowerCase() === "paid"
      )
      .map((invoice) => Number(calculateInvoiceAmount(invoice.items)));
    const paidAmount = paidTotals.reduce((sum, val) => sum + val, 0) || 0;

    const pendingTotals = filteredInvoices
      .filter(
        (invoice) => invoice.invoiceMeta?.paymentStatus?.toLowerCase() === "pending"
      )
      .map((invoice) => Number(calculateInvoiceAmount(invoice.items)));
    const pendingAmount = pendingTotals.reduce((sum, val) => sum + val, 0) || 0;

    return { totalAmount, paidAmount, pendingAmount };
  }, [filteredInvoices]);

  // Table headers configuration
  const tableHeaders = [
    { label: "Invoice", align: "text-left" },
    { label: "Client", align: "text-left" },
    { label: "Amount", align: "text-left" },
    { label: "Status", align: "text-left" },
    { label: "Date", align: "text-left" },
    { label: "Due Date", align: "text-left" },
    { label: "Actions", align: "text-right" },
  ];

  // Fetch invoices from API
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const baseurl = import.meta.env.VITE_BACKEND_PROTECTED_URL || "http://localhost:3000";
        const response = await axios.post(
          `${baseurl}/getinvoicearray`,
          {},
          { withCredentials: true, timeout: 10000 }
        );

        if (response.data && Array.isArray(response.data.invoices)) {
          setInvoices(response.data.invoices);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Error fetching invoices:", error.message);
        setError(
          error.response
            ? "Failed to fetch invoices: Server error"
            : "Failed to fetch invoices: Network error"
        );
        setInvoices(mockInvoices);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handle View Invoice
  const handleViewInvoice = useCallback(
    (invoiceId) => {
      const viewInvoice = filteredInvoices.find(
        (invoice) => invoice._id === invoiceId
      );
      if (viewInvoice) {
        localStorage.setItem("savedInvoice", JSON.stringify(viewInvoice));
        navigate("/bill", { state: { useLocal: true } });
      }
    },
    [filteredInvoices, navigate]
  );

  // Handle Delete Invoice
  const handleDeleteInvoice = async (invoiceId) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    try {
      const baseurl = import.meta.env.VITE_BACKEND_PROTECTED_URL || "http://localhost:3000";
      await axios.delete(`${baseurl}/deleteinvoice/${invoiceId}`, {
        withCredentials: true,
      });
      setInvoices(invoices.filter((invoice) => invoice._id !== invoiceId));
    } catch (error) {
      console.error("Error deleting invoice:", error.message);
      setError("Failed to delete invoice. Please try again.");
    }
  };

  const newInvoice = () => navigate("/templates");

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border p-4 animate-pulse"
        >
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          </div>
          <div className="mt-2 h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="mt-2 flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
                Invoice Management
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage and track your invoices
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search invoices..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  aria-label="Search invoices"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
              <button
                onClick={newInvoice}
                className="flex items-center justify-center bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
                aria-label="Create new invoice"
              >
                <Plus size={16} className="mr-2" />
                New Invoice
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-blue-900 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totals.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Paid Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totals.paidAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Pending Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totals.pendingAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              No invoices found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Get started by creating your first invoice.
            </p>
            <button
              onClick={newInvoice}
              className="bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 text-sm sm:text-base"
              aria-label="Create new invoice"
            >
              Create Invoice
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop View */}
            <table
              className="hidden lg:table w-full bg-white rounded-lg shadow-sm border divide-y divide-gray-200"
              role="grid"
            >
              <thead className="bg-gray-50">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th
                      key={index}
                      className={`px-6 py-3 ${header.align} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                      scope="col"
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <FileText className="h-4 w-4 text-blue-900" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-blue-900">
                            {invoice.invoiceMeta?.invoiceNo || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {invoice.items?.length || 0} items
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.customerInfo?.customerFirm || "Unknown Client"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        ${Number(calculateInvoiceAmount(invoice.items)).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                          invoice.invoiceMeta?.paymentStatus || "unknown"
                        )}`}
                      >
                        {invoice.invoiceMeta?.paymentStatus || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.createdAt
                        ? new Date(invoice.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.invoiceMeta?.date
                        ? new Date(invoice.invoiceMeta.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewInvoice(invoice._id)}
                          className="text-blue-900 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          aria-label={`View invoice ${invoice.invoiceMeta?.invoiceNo || "N/A"}`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteInvoice(invoice._id)}
                          className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          aria-label={`Delete invoice ${invoice.invoiceMeta?.invoiceNo || "N/A"}`}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View */}
            <div className="lg:hidden space-y-4">
              {filteredInvoices.map((invoice) => (
                <div
                  key={invoice._id}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <FileText className="h-4 w-4 text-blue-900" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-900">
                          {invoice.invoiceMeta?.invoiceNo || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {invoice.items?.length || 0} items
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                        invoice.invoiceMeta?.paymentStatus || "unknown"
                      )}`}
                    >
                      {invoice.invoiceMeta?.paymentStatus || "Unknown"}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.customerInfo?.customerFirm || "Unknown Client"}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      ${Number(calculateInvoiceAmount(invoice.items)).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <div>
                      <span className="font-medium">Created:</span>{" "}
                      {invoice.createdAt
                        ? new Date(invoice.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Invoice Date:</span>{" "}
                      {invoice.invoiceMeta?.date
                        ? new Date(invoice.invoiceMeta.date).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleViewInvoice(invoice._id)}
                      className="text-blue-900 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center space-x-1"
                      aria-label={`View invoice ${invoice.invoiceMeta?.invoiceNo || "N/A"}`}
                    >
                      <Eye size={14} />
                      <span className="text-xs">View</span>
                    </button>
                    <button
                      onClick={() => handleDeleteInvoice(invoice._id)}
                      className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center space-x-1"
                      aria-label={`Delete invoice ${invoice.invoiceMeta?.invoiceNo || "N/A"}`}
                    >
                      <Trash size={14} />
                      <span className="text-xs">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Invoices;