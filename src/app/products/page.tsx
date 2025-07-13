"use client";

import { useGetProductCategoriesQuery } from "@/features/categories/categoryApiSlice";
import { useGetProductsQuery } from "@/features/products/productApiSlice";
import { useState } from "react";
import {
  FaList,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTh,
} from "react-icons/fa";
import { HiOutlineAdjustments } from "react-icons/hi";
import ProductCard from "../_components/(card)/productCard";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    page: currentPage,
    limit,
    search: searchQuery,
    category: selectedCategory,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategoriesQuery({ page: 1, limit: 20 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSortBy("name");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = productsData?.pagination.totalPages || 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Beauty Products
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover our curated collection of premium beauty products from
              top brands
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
              <input
                type="text"
                placeholder="Search products..."
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
        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <HiOutlineAdjustments className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {(searchQuery || selectedCategory || minPrice || maxPrice) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-pink-600 hover:text-pink-700 transition-colors"
                >
                  Clear all
                </button>
              )}

              <div className="text-sm text-gray-600">
                {productsData?.pagination.totalCount || 0} products found
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid" ? "bg-white shadow-sm" : ""
                  }`}
                >
                  <FaTh className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list" ? "bg-white shadow-sm" : ""
                  }`}
                >
                  <FaList className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="createdAt">Newest</option>
                </select>
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {sortOrder === "asc" ? (
                    <FaSortAmountUp />
                  ) : (
                    <FaSortAmountDown />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={minPrice || ""}
                    onChange={(e) =>
                      setMinPrice(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="$0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={maxPrice || ""}
                    onChange={(e) =>
                      setMaxPrice(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="$1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-6"
          }`}
        >
          {productsLoading ? (
            Array.from({ length: limit }).map((_, index) => (
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
          ) : productsError ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-600 text-lg">Failed to load products</p>
            </div>
          ) : productsData?.data.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            productsData?.data.map((product) => (
              <div
                key={product.id}
                className={
                  viewMode === "list" ? "bg-white rounded-lg shadow-sm p-6" : ""
                }
              >
                {viewMode === "grid" ? (
                  <ProductCard product={product} />
                ) : (
                  <div className="flex space-x-6">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0">
                      {/* Product image would go here */}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-pink-600">
                          ${product.price}
                        </span>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
                            Add to Cart
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                            ❤️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const startPage = Math.max(1, currentPage - 2);
                const pageNumber = startPage + i;

                if (pageNumber > totalPages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-2 rounded-md ${
                      pageNumber === currentPage
                        ? "bg-pink-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
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
