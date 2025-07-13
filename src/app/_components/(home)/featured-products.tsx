"use client";

import { useGetProductsQuery } from "@/features/products/productApiSlice";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "../(card)/productCard";

export default function FeaturedProducts() {
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({ page: 1, limit: 8, featured: true });

  return (
    <div className="relative bg-gray-900 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(147,51,234,0.1),_transparent_50%)]"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(236,72,153,0.1),_transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl">
              Discover our handpicked selection of premium beauty products
            </p>
          </div>
          <Link
            href="/products?featured=true"
            className="hidden md:inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-200 transform hover:scale-105"
          >
            <span>View All</span>
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4 w-2/3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-700 rounded w-16"></div>
                    <div className="h-4 bg-gray-700 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : productsError ? (
          <div className="text-center py-12">
            <div className="text-red-400 text-lg">Failed to load products</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsData?.data.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                {/* Product Card */}
                <div className="relative z-20">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="text-center mt-12 md:hidden">
          <Link
            href="/products?featured=true"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>View All Featured Products</span>
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-pink-400">🌟</span>
            <span className="text-white text-sm font-medium">
              Curated by our beauty experts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
