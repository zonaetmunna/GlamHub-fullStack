"use client";

import { useGetBrandsQuery } from "@/features/brands/brandApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaBuilding,
  FaDownload,
  FaEdit,
  FaEye,
  FaFilter,
  FaGlobe,
  FaPlus,
  FaSearch,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
} from "react-icons/fa";

export default function BrandsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    data: brandsData,
    isLoading,
    error,
    refetch,
  } = useGetBrandsQuery({
    page: currentPage,
    limit: 12,
    search: searchQuery,
    isActive: statusFilter ? statusFilter === "active" : undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
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
        <div className="text-red-400 text-lg mb-4">Failed to load brands</div>
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
            Brands Management
          </h1>
          <p className="text-gray-400">
            Manage product brands and their information
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Link
            href="/dashboard/brand/add"
            className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Brand</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Brands</p>
              <p className="text-2xl font-bold text-white">
                {brandsData?.pagination?.totalCount || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaBuilding className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Brands</p>
              <p className="text-2xl font-bold text-white">
                {brandsData?.data?.filter((brand) => brand.isActive).length ||
                  0}
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
              <p className="text-sm text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-white">
                {brandsData?.data?.reduce(
                  (sum, brand) => sum + brand.productCount,
                  0
                ) || 0}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FaEye className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">With Websites</p>
              <p className="text-2xl font-bold text-white">
                {brandsData?.data?.filter((brand) => brand.website).length || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <FaGlobe className="w-6 h-6 text-orange-400" />
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
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search brands..."
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
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {brandsData?.data?.map((brand) => (
          <div
            key={brand.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
          >
            {/* Brand Logo */}
            <div className="relative h-32 bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {brand.name.charAt(0)}
                  </span>
                </div>
              )}
              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                {brand.isActive ? (
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* Brand Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 truncate">
                {brand.name}
              </h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {brand.description || "No description provided"}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-white">
                    {brand.productCount}
                  </span>{" "}
                  products
                </div>
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    <FaGlobe className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Created: {new Date(brand.createdAt).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Link
                  href={`/dashboard/brand/${brand.id}`}
                  className="flex-1 bg-blue-500/20 text-blue-400 text-center py-2 rounded-lg hover:bg-blue-500/30 transition-colors"
                >
                  <FaEye className="w-4 h-4 mx-auto" />
                </Link>
                <Link
                  href={`/dashboard/brand/${brand.id}/edit`}
                  className="flex-1 bg-green-500/20 text-green-400 text-center py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <FaEdit className="w-4 h-4 mx-auto" />
                </Link>
                <button className="flex-1 bg-yellow-500/20 text-yellow-400 text-center py-2 rounded-lg hover:bg-yellow-500/30 transition-colors">
                  {brand.isActive ? (
                    <FaToggleOff className="w-4 h-4 mx-auto" />
                  ) : (
                    <FaToggleOn className="w-4 h-4 mx-auto" />
                  )}
                </button>
                <button className="flex-1 bg-red-500/20 text-red-400 text-center py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                  <FaTrash className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {brandsData?.pagination && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing{" "}
              {(brandsData.pagination.page - 1) * brandsData.pagination.limit +
                1}{" "}
              to{" "}
              {Math.min(
                brandsData.pagination.page * brandsData.pagination.limit,
                brandsData.pagination.totalCount
              )}{" "}
              of {brandsData.pagination.totalCount} brands
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!brandsData.pagination.hasPreviousPage}
                className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-white">
                Page {brandsData.pagination.page} of{" "}
                {brandsData.pagination.totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!brandsData.pagination.hasNextPage}
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
