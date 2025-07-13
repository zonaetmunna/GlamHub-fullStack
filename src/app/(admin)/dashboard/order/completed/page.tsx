"use client";

import { useGetOrdersQuery } from "@/features/orders/orderApiSlice";
import Link from "next/link";
import { useState } from "react";
import {
  FaCheckCircle,
  FaDownload,
  FaEye,
  FaFilter,
  FaSearch,
  FaShippingFast,
  FaStar,
  FaUser,
} from "react-icons/fa";

export default function CompletedOrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("completedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: ordersData,
    isLoading,
    error,
    refetch,
  } = useGetOrdersQuery({
    page: currentPage,
    limit: 10,
    status: "COMPLETED",
    search: searchQuery,
    sortBy,
    sortOrder,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">
          Failed to load completed orders
        </div>
        <button
          onClick={() => refetch()}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Completed Orders
          </h1>
          <p className="text-gray-400">Successfully fulfilled orders</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            <FaStar className="w-4 h-4" />
            <span>Customer Reviews</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Completed</p>
              <p className="text-2xl font-bold text-white">
                {ordersData?.pagination?.totalCount || 0}
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
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white">
                $
                {ordersData?.data
                  ?.reduce((sum, order) => sum + order.totalAmount, 0)
                  .toFixed(2) || "0.00"}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaShippingFast className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Average Order Value</p>
              <p className="text-2xl font-bold text-white">
                $
                {ordersData?.data?.length
                  ? (
                      ordersData.data.reduce(
                        (sum, order) => sum + order.totalAmount,
                        0
                      ) / ordersData.data.length
                    ).toFixed(2)
                  : "0.00"}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FaUser className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-white">
                {ordersData?.data?.filter((order) => {
                  const orderDate = new Date(order.createdAt);
                  const now = new Date();
                  return (
                    orderDate.getMonth() === now.getMonth() &&
                    orderDate.getFullYear() === now.getFullYear()
                  );
                }).length || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <FaCheckCircle className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col lg:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search orders by ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <div className="relative">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="completedAt">Sort by Completion Date</option>
              <option value="totalAmount">Sort by Amount</option>
              <option value="customerName">Sort by Customer</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="text-left p-4 font-medium text-white">
                  Order ID
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Customer
                </th>
                <th className="text-left p-4 font-medium text-white">
                  <button
                    onClick={() => handleSort("totalAmount")}
                    className="flex items-center space-x-1 hover:text-pink-400 transition-colors"
                  >
                    <span>Amount</span>
                    {sortBy === "totalAmount" && (
                      <span className="text-pink-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-white">Items</th>
                <th className="text-left p-4 font-medium text-white">
                  Order Date
                </th>
                <th className="text-left p-4 font-medium text-white">
                  <button
                    onClick={() => handleSort("completedAt")}
                    className="flex items-center space-x-1 hover:text-pink-400 transition-colors"
                  >
                    <span>Completed Date</span>
                    {sortBy === "completedAt" && (
                      <span className="text-pink-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersData?.data?.map((order) => (
                <tr key={order.id} className="border-t border-white/10">
                  <td className="p-4">
                    <div className="font-medium text-white">#{order.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {order.user?.name?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {order.user?.name || "Unknown User"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {order.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white">
                      ${order.totalAmount.toFixed(2)}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white">
                      {order.items?.length || 0} items
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(order.updatedAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/order/${order.id}`}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <FaEye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/dashboard/invoice/${order.id}`}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                      >
                        <FaDownload className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {ordersData?.pagination && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing{" "}
                {(ordersData.pagination.page - 1) *
                  ordersData.pagination.limit +
                  1}{" "}
                to{" "}
                {Math.min(
                  ordersData.pagination.page * ordersData.pagination.limit,
                  ordersData.pagination.totalCount
                )}{" "}
                of {ordersData.pagination.totalCount} completed orders
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!ordersData.pagination.hasPreviousPage}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {ordersData.pagination.page} of{" "}
                  {ordersData.pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!ordersData.pagination.hasNextPage}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
