"use client";

import { useGetAdminDashboardQuery } from "@/features/admin/adminApiSlice";
import { useState } from "react";
import {
  FaArrowUp,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaDollarSign,
  FaDownload,
  FaEye,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d");
  const [metricType, setMetricType] = useState("revenue");

  const { data: analyticsData, isLoading } = useGetAdminDashboardQuery();

  const timeRanges = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" },
  ];

  const metrics = [
    { value: "revenue", label: "Revenue", icon: FaDollarSign },
    { value: "orders", label: "Orders", icon: FaShoppingBag },
    { value: "users", label: "Users", icon: FaUsers },
    { value: "products", label: "Products", icon: FaEye },
  ];

  const revenueData = [
    { month: "Jan", revenue: 25000, orders: 145 },
    { month: "Feb", revenue: 28000, orders: 165 },
    { month: "Mar", revenue: 32000, orders: 180 },
    { month: "Apr", revenue: 35000, orders: 195 },
    { month: "May", revenue: 38000, orders: 210 },
    { month: "Jun", revenue: 42000, orders: 230 },
  ];

  const topProducts = [
    { name: "Luxury Face Cream", sales: 245, revenue: 12250 },
    { name: "Hair Treatment Oil", sales: 198, revenue: 9900 },
    { name: "Anti-Aging Serum", sales: 167, revenue: 8350 },
    { name: "Moisturizing Lotion", sales: 156, revenue: 7800 },
    { name: "Facial Cleanser", sales: 134, revenue: 6700 },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">
            Comprehensive business insights and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <FaCalendarAlt className="text-gray-400" />
          </div>
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FaDollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <FaArrowUp className="w-4 h-4" />
              <span className="text-sm">+12.5%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <p className="text-2xl font-bold text-white">
              $
              {analyticsData?.data?.revenue?.thisMonth?.toLocaleString() || "0"}
            </p>
            <p className="text-xs text-gray-500">This month</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaShoppingBag className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center space-x-1 text-blue-400">
              <FaArrowUp className="w-4 h-4" />
              <span className="text-sm">+8.2%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Total Orders</p>
            <p className="text-2xl font-bold text-white">
              {analyticsData?.data?.overview?.totalOrders?.toLocaleString() ||
                "0"}
            </p>
            <p className="text-xs text-gray-500">All time</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FaUsers className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex items-center space-x-1 text-purple-400">
              <FaArrowUp className="w-4 h-4" />
              <span className="text-sm">+15.3%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Total Users</p>
            <p className="text-2xl font-bold text-white">
              {analyticsData?.data?.overview?.totalUsers?.toLocaleString() ||
                "0"}
            </p>
            <p className="text-xs text-gray-500">All time</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <FaEye className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex items-center space-x-1 text-orange-400">
              <FaArrowUp className="w-4 h-4" />
              <span className="text-sm">+5.1%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Products</p>
            <p className="text-2xl font-bold text-white">
              {analyticsData?.data?.overview?.totalProducts?.toLocaleString() ||
                "0"}
            </p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Revenue Trends</h3>
            <div className="flex items-center space-x-2">
              <FaChartLine className="text-pink-400" />
              <select className="bg-white/10 border border-white/20 rounded-lg py-1 px-3 text-white text-sm">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {revenueData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-pink-500 to-purple-600 rounded-t-lg mb-2"
                  style={{
                    height: `${(item.revenue / 50000) * 100}%`,
                    minHeight: "20px",
                  }}
                ></div>
                <span className="text-xs text-gray-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Order Status</h3>
            <FaChartPie className="text-pink-400" />
          </div>
          <div className="space-y-4">
            {[
              { label: "Delivered", value: 65, color: "bg-green-500" },
              { label: "Processing", value: 20, color: "bg-yellow-500" },
              { label: "Pending", value: 10, color: "bg-orange-500" },
              { label: "Cancelled", value: 5, color: "bg-red-500" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{item.label}</span>
                    <span className="text-sm text-gray-400">{item.value}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Top Products</h3>
          <div className="flex items-center space-x-2">
            <FaChartBar className="text-pink-400" />
            <select className="bg-white/10 border border-white/20 rounded-lg py-1 px-3 text-white text-sm">
              <option>By Sales</option>
              <option>By Revenue</option>
              <option>By Views</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-gray-400 font-medium">
                  Product
                </th>
                <th className="text-right py-3 text-gray-400 font-medium">
                  Sales
                </th>
                <th className="text-right py-3 text-gray-400 font-medium">
                  Revenue
                </th>
                <th className="text-right py-3 text-gray-400 font-medium">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 text-white">
                    {product.sales}
                  </td>
                  <td className="text-right py-3 text-white">
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td className="text-right py-3">
                    <div className="w-20 bg-white/10 rounded-full h-2 ml-auto">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
                        style={{
                          width: `${(product.sales / 250) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Customer Metrics
            </h3>
            <FaUsers className="text-pink-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">New Customers</span>
              <span className="text-white">
                {analyticsData?.data?.customers?.new || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Returning Customers</span>
              <span className="text-white">
                {analyticsData?.data?.customers?.returning || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Loyalty Rate</span>
              <span className="text-green-400">
                {(
                  ((analyticsData?.data?.customers?.returning || 0) /
                    (analyticsData?.data?.customers?.total || 1)) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Order Metrics</h3>
            <FaShoppingBag className="text-pink-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Avg Order Value</span>
              <span className="text-white">
                ${analyticsData?.data?.orders?.averageOrderValue || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Orders Today</span>
              <span className="text-white">
                {analyticsData?.data?.recentActivity?.newOrders || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Completion Rate</span>
              <span className="text-green-400">94.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Product Metrics
            </h3>
            <FaEye className="text-pink-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Products</span>
              <span className="text-white">
                {analyticsData?.data?.overview?.totalProducts || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Low Stock</span>
              <span className="text-yellow-400">
                {analyticsData?.data?.products?.lowStock || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Out of Stock</span>
              <span className="text-red-400">
                {analyticsData?.data?.products?.outOfStock || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
