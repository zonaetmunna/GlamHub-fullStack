"use client";

import { useGetServicesQuery } from "@/features/services/serviceApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaClock,
  FaDownload,
  FaEdit,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
  FaSpa,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
  FaUsers,
} from "react-icons/fa";

export default function ServicesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: servicesData,
    isLoading,
    error,
    refetch,
  } = useGetServicesQuery({
    page: currentPage,
    limit: 12,
    search: searchQuery,
    category: categoryFilter,
    minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
    maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
    sortBy,
    sortOrder,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case "category":
        setCategoryFilter(value);
        break;
      case "status":
        setStatusFilter(value);
        break;
    }
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

  const getDurationColor = (duration: number) => {
    if (duration <= 30) return "text-green-400";
    if (duration <= 60) return "text-blue-400";
    if (duration <= 90) return "text-purple-400";
    return "text-pink-400";
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
        <div className="text-red-400 text-lg mb-4">Failed to load services</div>
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
            Services Management
          </h1>
          <p className="text-gray-400">
            Manage spa and beauty services catalog
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Link
            href="/dashboard/services/add"
            className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Service</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Services</p>
              <p className="text-2xl font-bold text-white">
                {servicesData?.pagination?.totalCount || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaSpa className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Services</p>
              <p className="text-2xl font-bold text-white">
                {servicesData?.data?.filter((service) => service.isActive)
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
              <p className="text-sm text-gray-400">Avg Duration</p>
              <p className="text-2xl font-bold text-white">
                {servicesData?.data?.length
                  ? Math.round(
                      servicesData.data.reduce(
                        (sum, service) => sum + service.duration,
                        0
                      ) / servicesData.data.length
                    )
                  : 0}
                min
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FaClock className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Bookings</p>
              <p className="text-2xl font-bold text-white">
                {servicesData?.data?.reduce(
                  (sum, service) => sum + (service.bookingCount || 0),
                  0
                ) || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <FaUsers className="w-6 h-6 text-orange-400" />
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
              placeholder="Search services..."
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
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Categories</option>
              <option value="FACIAL">Facial</option>
              <option value="MASSAGE">Massage</option>
              <option value="HAIR">Hair</option>
              <option value="NAILS">Nails</option>
              <option value="BODY">Body Treatment</option>
              <option value="WELLNESS">Wellness</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Price Range */}
          <div className="flex items-center space-x-2">
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

          {/* Search Button */}
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {servicesData?.data?.map((service) => (
          <div
            key={service.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
          >
            {/* Service Image */}
            <div className="relative h-48 bg-gradient-to-br from-pink-500/20 to-purple-600/20">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <FaSpa className="w-12 h-12 text-gray-400" />
                </div>
              )}
              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                {service.isActive ? (
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

            {/* Service Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 truncate">
                {service.name}
              </h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {service.description || "No description provided"}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="text-sm">
                  <span className="text-pink-400 font-bold text-lg">
                    ${service.price}
                  </span>
                </div>
                <div className="text-sm">
                  <span
                    className={`font-medium ${getDurationColor(
                      service.duration
                    )}`}
                  >
                    {service.duration}min
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                  {service.category}
                </span>
                <span className="text-xs text-gray-400">
                  {service.bookingCount || 0} bookings
                </span>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Created: {new Date(service.createdAt).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Link
                  href={`/dashboard/services/${service.id}`}
                  className="flex-1 bg-blue-500/20 text-blue-400 text-center py-2 rounded-lg hover:bg-blue-500/30 transition-colors"
                >
                  <FaEye className="w-4 h-4 mx-auto" />
                </Link>
                <Link
                  href={`/dashboard/services/${service.id}/edit`}
                  className="flex-1 bg-green-500/20 text-green-400 text-center py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <FaEdit className="w-4 h-4 mx-auto" />
                </Link>
                <button className="flex-1 bg-yellow-500/20 text-yellow-400 text-center py-2 rounded-lg hover:bg-yellow-500/30 transition-colors">
                  {service.isActive ? (
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
      {servicesData?.pagination && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing{" "}
              {(servicesData.pagination.page - 1) *
                servicesData.pagination.limit +
                1}{" "}
              to{" "}
              {Math.min(
                servicesData.pagination.page * servicesData.pagination.limit,
                servicesData.pagination.totalCount
              )}{" "}
              of {servicesData.pagination.totalCount} services
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!servicesData.pagination.hasPreviousPage}
                className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-white">
                Page {servicesData.pagination.page} of{" "}
                {servicesData.pagination.totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!servicesData.pagination.hasNextPage}
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
