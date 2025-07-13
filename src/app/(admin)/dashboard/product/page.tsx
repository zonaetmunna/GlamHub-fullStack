"use client";

import { useGetCategoriesQuery } from "@/features/categories/categoryApiSlice";
import { useGetProductsQuery } from "@/features/products/productApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaDownload,
  FaEdit,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
  FaStar,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
} from "react-icons/fa";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    page: currentPage,
    limit: 12,
    search: searchQuery,
    category: categoryFilter,
    minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
    maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
    sortBy,
    sortOrder,
  });

  const { data: categoriesData } = useGetCategoriesQuery({
    page: 1,
    limit: 50,
    type: "PRODUCT",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
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

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return "bg-red-500/20 text-red-400";
    if (stock < 10) return "bg-yellow-500/20 text-yellow-400";
    return "bg-green-500/20 text-green-400";
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    return "In Stock";
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
        <div className="text-red-400 text-lg mb-4">Failed to load products</div>
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
            Products Management
          </h1>
          <p className="text-gray-400">
            Manage your product catalog and inventory
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Link
            href="/dashboard/product/add"
            className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
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
              <FaEye className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Products</p>
              <p className="text-2xl font-bold text-white">
                {productsData?.data?.filter((product) => product.isActive)
                  .length || 0}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FaToggleOn className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Low Stock</p>
              <p className="text-2xl font-bold text-white">
                {productsData?.data?.filter(
                  (product) => product.stockCount < 10
                ).length || 0}
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <FaToggleOff className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Featured</p>
              <p className="text-2xl font-bold text-white">
                {productsData?.data?.filter((product) => product.isFeatured)
                  .length || 0}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FaStar className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
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

            {/* Category Filter */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">All Categories</option>
                {categoriesData?.data?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="featured">Featured</option>
                <option value="low-stock">Low Stock</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-white text-sm">Price Range:</label>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="w-20 bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className="w-20 bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productsData?.data?.map((product) => (
          <div
            key={product.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gradient-to-br from-pink-500/20 to-purple-600/20">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <FaEye className="w-12 h-12" />
                </div>
              )}
              {/* Status Badges */}
              <div className="absolute top-2 right-2 flex flex-col space-y-1">
                {product.isFeatured && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
                {!product.isActive && (
                  <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-bold text-white">
                  ${product.price.toFixed(2)}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${getStockStatusColor(
                    product.stockCount
                  )}`}
                >
                  {getStockStatus(product.stockCount)}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>Stock: {product.stockCount}</span>
                <span>Category: {product.category?.name || "N/A"}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Link
                  href={`/dashboard/product/${product.id}`}
                  className="flex-1 bg-blue-500/20 text-blue-400 text-center py-2 rounded-lg hover:bg-blue-500/30 transition-colors"
                >
                  <FaEye className="w-4 h-4 mx-auto" />
                </Link>
                <Link
                  href={`/dashboard/product/${product.id}/edit`}
                  className="flex-1 bg-green-500/20 text-green-400 text-center py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <FaEdit className="w-4 h-4 mx-auto" />
                </Link>
                <button className="flex-1 bg-red-500/20 text-red-400 text-center py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                  <FaTrash className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {productsData?.pagination && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
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
                className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
