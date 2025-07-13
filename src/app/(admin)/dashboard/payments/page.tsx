"use client";

import { useState } from "react";
import {
  FaCheckCircle,
  FaCreditCard,
  FaDownload,
  FaExclamationTriangle,
  FaFilter,
  FaMoneyBillWave,
  FaRefresh,
  FaSearch,
  FaTimesCircle,
  FaUndo,
} from "react-icons/fa";

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
  method: "CARD" | "PAYPAL" | "STRIPE" | "BANK_TRANSFER";
  currency: string;
  customerName: string;
  customerEmail: string;
  transactionId: string;
  createdAt: string;
  refundedAmount?: number;
}

export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Mock data - replace with actual API call
  const paymentsData = {
    data: [
      {
        id: "pay_1",
        orderId: "ORD_001",
        amount: 125.99,
        status: "COMPLETED" as const,
        method: "CARD" as const,
        currency: "USD",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@example.com",
        transactionId: "txn_abc123",
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "pay_2",
        orderId: "ORD_002",
        amount: 89.5,
        status: "PENDING" as const,
        method: "PAYPAL" as const,
        currency: "USD",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        transactionId: "txn_def456",
        createdAt: "2024-01-15T09:15:00Z",
      },
      {
        id: "pay_3",
        orderId: "ORD_003",
        amount: 200.0,
        status: "FAILED" as const,
        method: "CARD" as const,
        currency: "USD",
        customerName: "Mike Wilson",
        customerEmail: "mike@example.com",
        transactionId: "txn_ghi789",
        createdAt: "2024-01-15T08:45:00Z",
      },
      {
        id: "pay_4",
        orderId: "ORD_004",
        amount: 75.25,
        status: "REFUNDED" as const,
        method: "STRIPE" as const,
        currency: "USD",
        customerName: "Emma Brown",
        customerEmail: "emma@example.com",
        transactionId: "txn_jkl012",
        createdAt: "2024-01-14T16:20:00Z",
        refundedAmount: 75.25,
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      totalCount: 4,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500/20 text-green-400";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";
      case "FAILED":
        return "bg-red-500/20 text-red-400";
      case "REFUNDED":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <FaCheckCircle className="w-4 h-4" />;
      case "PENDING":
        return <FaRefresh className="w-4 h-4" />;
      case "FAILED":
        return <FaTimesCircle className="w-4 h-4" />;
      case "REFUNDED":
        return <FaUndo className="w-4 h-4" />;
      default:
        return <FaExclamationTriangle className="w-4 h-4" />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "CARD":
      case "STRIPE":
        return <FaCreditCard className="w-4 h-4" />;
      case "PAYPAL":
        return <FaMoneyBillWave className="w-4 h-4" />;
      default:
        return <FaCreditCard className="w-4 h-4" />;
    }
  };

  const totalRevenue = paymentsData.data
    .filter((payment) => payment.status === "COMPLETED")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = paymentsData.data
    .filter((payment) => payment.status === "PENDING")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const refundedAmount = paymentsData.data
    .filter((payment) => payment.status === "REFUNDED")
    .reduce((sum, payment) => sum + (payment.refundedAmount || 0), 0);

  const failedAmount = paymentsData.data
    .filter((payment) => payment.status === "FAILED")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Payment Management
          </h1>
          <p className="text-gray-400">
            Monitor transactions, refunds, and payment analytics
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FaCheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-white">
                ${pendingAmount.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <FaRefresh className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Refunded</p>
              <p className="text-2xl font-bold text-white">
                ${refundedAmount.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaUndo className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Failed</p>
              <p className="text-2xl font-bold text-white">
                ${failedAmount.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <FaTimesCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by customer, order ID, or transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Method Filter */}
          <div className="relative">
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Methods</option>
              <option value="CARD">Credit Card</option>
              <option value="PAYPAL">PayPal</option>
              <option value="STRIPE">Stripe</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="text-left p-4 font-medium text-white">
                  Transaction
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Customer
                </th>
                <th className="text-left p-4 font-medium text-white">Amount</th>
                <th className="text-left p-4 font-medium text-white">Method</th>
                <th className="text-left p-4 font-medium text-white">Status</th>
                <th className="text-left p-4 font-medium text-white">Date</th>
                <th className="text-left p-4 font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentsData.data.map((payment) => (
                <tr key={payment.id} className="border-t border-white/10">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-white">
                        {payment.transactionId}
                      </p>
                      <p className="text-sm text-gray-400">
                        Order: {payment.orderId}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-white">
                        {payment.customerName}
                      </p>
                      <p className="text-sm text-gray-400">
                        {payment.customerEmail}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white">
                      ${payment.amount.toFixed(2)} {payment.currency}
                    </div>
                    {payment.refundedAmount && (
                      <div className="text-sm text-blue-400">
                        Refunded: ${payment.refundedAmount.toFixed(2)}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(payment.method)}
                      <span className="text-white">{payment.method}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center space-x-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {getStatusIcon(payment.status)}
                      <span>{payment.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(payment.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {payment.status === "COMPLETED" && (
                        <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                          <FaUndo className="w-4 h-4" />
                        </button>
                      )}
                      {payment.status === "FAILED" && (
                        <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                          <FaRefresh className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing 1 to {paymentsData.data.length} of{" "}
              {paymentsData.pagination.totalCount} payments
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled={!paymentsData.pagination.hasPreviousPage}
                className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-white">
                Page {paymentsData.pagination.page} of{" "}
                {paymentsData.pagination.totalPages}
              </span>
              <button
                disabled={!paymentsData.pagination.hasNextPage}
                className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
