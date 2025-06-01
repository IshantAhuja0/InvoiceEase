import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkJWT } from "../../utils/storeInvoice";
import {
  Search,
  Download,
  Eye,
  Filter,
  Plus,
  DollarSign,
  FileText,
} from "lucide-react";

// Mock data for testing if API is unavailable
const mockInvoices = [
  {
    _id: "1",
    invoiceMeta: {
      invoiceNo: "INV-001",
      paymentStatus: "paid",
      date: "2025-05-01",
    },
    customerInfo: { customerFirm: "Acme Corp" },
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ],
    amount: 1000,
    status: "paid",
    createdAt: "2025-05-01",
  },
  {
    _id: "2",
    invoiceMeta: {
      invoiceNo: "INV-002",
      paymentStatus: "pending",
      date: "2025-05-15",
    },
    customerInfo: { customerFirm: "Globex Inc" },
    items: [{ id: 3, name: "Item 3" }],
    amount: 500,
    status: "pending",
    createdAt: "2025-05-15",
  },
];

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

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

  // Filter invoices based on search term and status
const filteredInvoices = invoices.filter((invoice) => {
  const firmName = invoice.customerInfo?.customerFirm?.toLowerCase() || "";
  const invoiceNo = invoice.invoiceMeta?.invoiceNo?.toString().toLowerCase() || "";
  const status = invoice.status?.toLowerCase() || "";

  const matchesSearch =
    firmName.includes(searchTerm.toLowerCase()) ||
    invoiceNo.includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "all" || status === statusFilter.toLowerCase();

  return matchesSearch && matchesStatus;
});


  // Calculate totals for stats cards

  const totals = filteredInvoices.map((invoice, index) => {
    let sum = 0;
    invoice.items.forEach((item) => {
      sum += item.price * (1 + item.tax / 100) * item.quantity;
    });
    return sum;
  });
  const totalAmount = totals.reduce((sum, val) => sum + val, 0);

  const paidTotals = filteredInvoices
    .filter((invoice) => invoice.invoiceMeta.paymentStatus === "Paid")
    .map((invoice) => {
      let sum = 0;
      invoice.items.forEach((item) => {
        sum += item.price * (1 + item.tax / 100) * item.quantity;
      });
      return sum;
    });

  const pendingTotals = filteredInvoices
    .filter((invoice) => invoice.invoiceMeta.paymentStatus === "Pending")
    .map((invoice) => {
      let sum = 0;
      invoice.items.forEach((item) => {
        sum += item.price * (1 + item.tax / 100) * item.quantity;
      });
      return sum;
    });

  const paidAmount = paidTotals.reduce((sum, val) => sum + val, 0);
  const pendingAmount = pendingTotals.reduce((sum, val) => sum + val, 0);

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
        const jwtStatus = await checkJWT();
        if (!jwtStatus.valid) {
          console.warn("JWT invalid:", jwtStatus.reason);
          setError("Invalid authentication. Please log in again.");
          // Optionally use mock data for testing
          setInvoices(mockInvoices);
          return;
        }

        const { token, authorEmail } = jwtStatus;
        const encodedEmail = encodeURIComponent(authorEmail);
        const response = await axios.post(
          `http://localhost:5000/api/protected/getinvoicearray/${encodedEmail}`,
          { token },
          { timeout: 10000 } // 10-second timeout
        );

        if (response.data && Array.isArray(response.data.invoices)) {
          console.log("Fetched invoices:", response.data.invoices);
          setInvoices(response.data.invoices);
        } else {
          console.error("Invalid response format:", response.data);
          setError("Invalid data received from server");
          // Fallback to mock data
          setInvoices(mockInvoices);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error.message);
        setError("Failed to fetch invoices. Please try again later.");
        // Fallback to mock data
        setInvoices(mockInvoices);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
                Invoice Management
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage and track your invoices
              </p>
            </div>
            <button className="bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm text-sm sm:text-base">
              <Plus size={18} className="sm:w-5 sm:h-5" />
              <span>New Invoice</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-blue-900" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total Amount
                </p>
                <p className="text-lg sm:text-2xl font-bold text-blue-900">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Paid
                </p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">
                  ${paidAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Pending
                </p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-600">
                  ${pendingAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border mb-4 sm:mb-6">
          <div className="p-4 sm:p-6">
            <div className="flex w-full gap-4">
              {/* 80% Width Search Input */}
              <div className="relative flex-[8.7]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* 20% Width Filter Dropdown */}
              <div className="flex-[1.3]">
                <select
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex space-x-2 animate-pulse">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 sm:p-12 text-center">
            <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              No invoices found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Get started by creating your first invoice.
            </p>
            <button className="bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 text-sm sm:text-base">
              Create Invoice
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice._id || Math.random()}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Desktop View */}
                <div className="hidden lg:table w-full">
                  <div className="table-header-group bg-gray-50">
                    <div className="table-row">
                      {tableHeaders.map((header, index) => (
                        <div
                          key={index}
                          className={`table-cell px-6 py-3 ${header.align} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                        >
                          {header.label}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="table-row-group bg-white divide-y divide-gray-200">
                    <div className="table-row hover:bg-gray-50 transition-colors duration-150">
                      <div className="table-cell px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            <FileText className="h-4 w-4 text-blue-900" />
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
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {invoice.customerInfo?.customerFirm ||
                            "Unknown Client"}
                        </div>
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          $
                          {invoice.items
                            .reduce((sum, item) => {
                              return (
                                sum +
                                item.price *
                                  (1 + item.tax / 100) *
                                  item.quantity
                              );
                            }, 0)
                            .toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                        </div>
                      </div>

                      <div className="table-cell px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                            invoice.invoiceMeta?.paymentStatus ||
                              invoice.status ||
                              "unknown"
                          )}`}
                        >
                          {invoice.invoiceMeta?.paymentStatus ||
                            invoice.status ||
                            "Unknown"}
                        </span>
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {invoice.createdAt
                          ? new Date(invoice.createdAt).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {invoice.invoiceMeta?.date
                          ? new Date(
                              invoice.invoiceMeta.date
                            ).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-900 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200">
                            <Eye size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200">
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <FileText className="h-4 w-4 text-blue-900" />
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
                        invoice.invoiceMeta?.paymentStatus ||
                          invoice.status ||
                          "unknown"
                      )}`}
                    >
                      {invoice.invoiceMeta?.paymentStatus ||
                        invoice.status ||
                        "Unknown"}
                    </span>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.customerInfo?.customerFirm || "Unknown Client"}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      ${invoice.amount?.toLocaleString() || "0"}
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
                        ? new Date(
                            invoice.invoiceMeta.date
                          ).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <button className="text-blue-900 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center space-x-1">
                      <Eye size={14} />
                      <span className="text-xs">View</span>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center space-x-1">
                      <Download size={14} />
                      <span className="text-xs">Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
