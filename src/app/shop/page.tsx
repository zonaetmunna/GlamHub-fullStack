"use client";

import { useGetProductCategoriesQuery } from "@/features/categories/categoryApiSlice";
import { useGetProductsQuery } from "@/features/products/productApiSlice";
import Link from "next/link";
import { useState } from "react";
import {
  FaArrowRight,
  FaHeart,
  FaSearch,
  FaStar,
  FaTags,
} from "react-icons/fa";
import ProductCard from "../_components/(card)/productCard";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: featuredProductsData, isLoading: featuredLoading } =
    useGetProductsQuery({
      page: 1,
      limit: 8,
      featured: true,
    });

  const { data: newProductsData, isLoading: newLoading } = useGetProductsQuery({
    page: 1,
    limit: 8,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategoriesQuery({ page: 1, limit: 8 });

  const { data: searchResults, isLoading: searchLoading } = useGetProductsQuery(
    {
      page: 1,
      limit: 12,
      search: searchQuery,
      category: selectedCategory,
    },
    { skip: !searchQuery && !selectedCategory }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Shop Beauty Essentials
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover premium beauty products from top brands, curated just for
              you
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto relative"
            >
              <input
                type="text"
                placeholder="Search for products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 pr-4 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 text-lg"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </form>

            <div className="mt-6 flex justify-center space-x-4 text-sm">
              <span>Popular searches:</span>
              <button className="hover:underline">Foundation</button>
              <button className="hover:underline">Lipstick</button>
              <button className="hover:underline">Skincare</button>
              <button className="hover:underline">Mascara</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categoriesLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-24 mb-3"></div>
                    <div className="bg-gray-200 rounded h-4"></div>
                  </div>
                ))
              : categoriesData?.data.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group text-center p-4 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-pink-100 border-2 border-pink-500"
                        : "bg-white border border-gray-200 hover:border-pink-300 hover:shadow-md"
                    }`}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                      <span className="text-2xl">🛍️</span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {category.name}
                    </h3>
                  </button>
                ))}
          </div>
        </section>

        {/* Search Results */}
        {(searchQuery || selectedCategory) && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : `Products in ${
                      categoriesData?.data.find(
                        (c) => c.id === selectedCategory
                      )?.name
                    }`}
              </h2>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                }}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Clear filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))
              ) : searchResults?.data.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or browse our categories
                  </p>
                </div>
              ) : (
                searchResults?.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </section>
        )}

        {/* Featured Products Section */}
        {!searchQuery && !selectedCategory && (
          <>
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Featured Products
                </h2>
                <Link
                  href="/products?featured=true"
                  className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium"
                >
                  <span>View All</span>
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredLoading
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                      >
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))
                  : featuredProductsData?.data.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
              </div>
            </section>

            {/* New Arrivals Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  New Arrivals
                </h2>
                <Link
                  href="/products?sortBy=createdAt&sortOrder=desc"
                  className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium"
                >
                  <span>View All</span>
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newLoading
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                      >
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))
                  : newProductsData?.data.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
              </div>
            </section>

            {/* Promotional Banners */}
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Summer Sale</h3>
                  <p className="text-lg mb-4">
                    Up to 50% off on selected items
                  </p>
                  <Link
                    href="/products?sale=true"
                    className="inline-flex items-center space-x-2 bg-white text-pink-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <span>Shop Sale</span>
                    <FaTags className="w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Beauty Box</h3>
                  <p className="text-lg mb-4">
                    Curated monthly beauty essentials
                  </p>
                  <Link
                    href="/subscription"
                    className="inline-flex items-center space-x-2 bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <span>Subscribe</span>
                    <FaHeart className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Brand Showcase */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Featured Brands
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {[
                  "Chanel",
                  "Dior",
                  "MAC",
                  "NARS",
                  "Urban Decay",
                  "Fenty Beauty",
                ].map((brand) => (
                  <div
                    key={brand}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-gray-400 text-xs font-medium">
                        {brand.substring(0, 2)}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {brand}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Customer Reviews Teaser */}
            <section className="bg-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-6 h-6" />
                ))}
              </div>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                &quot;Amazing quality products and fast shipping! GlamHub has
                become my go-to for all beauty needs.&quot;
              </p>
              <p className="text-sm text-gray-500">
                - Sarah M., Verified Customer
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
