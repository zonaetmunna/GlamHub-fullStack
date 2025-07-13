"use client";

import { useGetProductsQuery } from "@/features/products/productApiSlice";
import { useState } from "react";
import {
  FaBoxOpen,
  FaDownload,
  FaEdit,
  FaExclamationTriangle,
  FaSearch,
  FaWarehouse,
} from "react-icons/fa";

export default function InventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery,
    sortBy,
    sortOrder,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", color: "bg-red-500/20 text-red-400" };
    if (stock <= 10)
      return { label: "Low Stock", color: "bg-yellow-500/20 text-yellow-400" };
    if (stock <= 50)
      return { label: "Medium Stock", color: "bg-blue-500/20 text-blue-400" };
    return { label: "High Stock", color: "bg-green-500/20 text-green-400" };
  };

  const mockStock = (productId: string) => {
    // Mock stock data - replace with actual API
    const stocks = [0, 5, 15, 25, 50, 100, 200];
    return stocks[productId.charCodeAt(0) % stocks.length];
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
          Failed to load inventory data
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
            Inventory Management
          </h1>
          <p className="text-gray-400">
            Track stock levels and manage inventory
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            <FaWarehouse className="w-4 h-4" />
            <span>Restock Alert</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-white">
                {productsData?.pagination?.totalCount || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaBoxOpen className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Out of Stock</p>
              <p className="text-2xl font-bold text-white">
                {productsData?.data?.filter(
                  (product) => mockStock(product.id) === 0
                ).length || 0}
              </p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <FaExclamationTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Low Stock</p>
              <p className="text-2xl font-bold text-white">
                {productsData?.data?.filter((product) => {
                  const stock = mockStock(product.id);
                  return stock > 0 && stock <= 10;
                }).length || 0}
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <FaWarehouse className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Stock Value</p>
              <p className="text-2xl font-bold text-white">
                $
                {productsData?.data
                  ?.reduce(
                    (sum, product) =>
                      sum + product.price * mockStock(product.id),
                    0
                  )
                  .toFixed(2) || "0.00"}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FaBoxOpen className="w-6 h-6 text-green-400" />
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">All Stock Levels</option>
            <option value="out">Out of Stock</option>
            <option value="low">Low Stock</option>
            <option value="medium">Medium Stock</option>
            <option value="high">High Stock</option>
          </select>
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Inventory Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="text-left p-4 font-medium text-white">
                  Product
                </th>
                <th className="text-left p-4 font-medium text-white">SKU</th>
                <th className="text-left p-4 font-medium text-white">Stock</th>
                <th className="text-left p-4 font-medium text-white">Status</th>
                <th className="text-left p-4 font-medium text-white">Price</th>
                <th className="text-left p-4 font-medium text-white">
                  Stock Value
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Last Updated
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productsData?.data?.map((product) => {
                const stock = mockStock(product.id);
                const stockStatus = getStockStatus(stock);
                return (
                  <tr key={product.id} className="border-t border-white/10">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FaBoxOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {product.category?.name || "No Category"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-white">
                        #{product.id.slice(-8)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-white font-medium">{stock}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${stockStatus.color}`}
                      >
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-white">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-white font-medium">
                        ${(product.price * stock).toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-white">
                        {new Date(product.updatedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                        <FaEdit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {productsData?.pagination && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing{" "}
                {(productsData.pagination.page - 1) *
                  productsData.pagination.limit +
                  1}{" "}
                to{" "}
                {Math.min(
                  productsData.pagination.page * productsData.pagination.limit,
                  productsData.pagination.totalCount
                )}{" "}
                of {productsData.pagination.totalCount} products
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!productsData.pagination.hasPreviousPage}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {productsData.pagination.page} of{" "}
                  {productsData.pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!productsData.pagination.hasNextPage}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
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
