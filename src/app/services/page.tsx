"use client";

import { useGetServiceCategoriesQuery } from "@/features/categories/categoryApiSlice";
import { useGetServicesQuery } from "@/features/services/serviceApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaSearch,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { HiOutlineAdjustments } from "react-icons/hi";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: servicesData,
    isLoading: servicesLoading,
    error: servicesError,
  } = useGetServicesQuery({
    page: 1,
    limit: 20,
    search: searchQuery,
    category: selectedCategory,
    sortBy,
    sortOrder,
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetServiceCategoriesQuery({ page: 1, limit: 10 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("name");
    setSortOrder("asc");
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ""}`;
    }
    return `${remainingMinutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Beauty Services
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover our wide range of professional beauty services designed
              to make you look and feel your best
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <HiOutlineAdjustments className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {(searchQuery || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-pink-600 hover:text-pink-700 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="duration">Duration</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">All Categories</option>
                    {categoriesData?.data.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))
          ) : servicesError ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-600 text-lg">Failed to load services</p>
            </div>
          ) : servicesData?.data.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No services found</p>
            </div>
          ) : (
            servicesData?.data.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-48">
                  {service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <span className="text-4xl">💆‍♀️</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <FaStar className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs font-medium">4.8</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FaDollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-lg font-bold text-green-600">
                          ${service.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {formatDuration(service.duration)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {service.staff && service.staff.length > 0 && (
                    <div className="flex items-center space-x-2 mb-4">
                      <FaUser className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {service.staff.length} staff available
                      </span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Link
                      href={`/services/${service.id}`}
                      className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors text-center text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/book-appointment?service=${service.id}`}
                      className="flex items-center justify-center px-4 py-2 bg-white border border-pink-500 text-pink-500 rounded-md hover:bg-pink-50 transition-colors"
                    >
                      <FaCalendarAlt className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {servicesData?.pagination && servicesData.pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex space-x-2">
              <button
                disabled={!servicesData.pagination.hasPreviousPage}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from(
                { length: servicesData.pagination.totalPages },
                (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-2 rounded-md ${
                      i + 1 === servicesData.pagination.page
                        ? "bg-pink-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                disabled={!servicesData.pagination.hasNextPage}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
