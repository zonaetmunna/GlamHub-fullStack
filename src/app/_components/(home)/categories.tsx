"use client";

import { useGetCategoriesQuery } from "@/features/categories/categoryApiSlice";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Categories() {
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery({ page: 1, limit: 8 });

  const getCategoryIcon = (index: number) => {
    const icons = ["💄", "🧴", "💅", "🌟", "🎨", "💍", "🌺", "✨"];
    return icons[index % icons.length];
  };

  return (
    <div className="relative bg-black py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(219,39,119,0.1),_transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop by{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our curated beauty collections designed for every style and
            need
          </p>
        </div>

        {/* Categories Grid */}
        {categoriesLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse"
              >
                <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mx-auto mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mx-auto w-2/3"></div>
              </div>
            ))}
          </div>
        ) : categoriesError ? (
          <div className="text-center py-12">
            <div className="text-red-400 text-lg">
              Failed to load categories
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoriesData?.data.map((category, index) => (
              <Link
                key={category.id}
                href={
                  category.type === "PRODUCT"
                    ? `/products?category=${category.id}`
                    : `/services?category=${category.id}`
                }
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category Icon */}
                <div className="relative w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl filter drop-shadow-lg">
                    {getCategoryIcon(index)}
                  </span>
                </div>

                {/* Category Info */}
                <div className="relative text-center">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {category.type === "PRODUCT" ? "Products" : "Services"}
                  </p>

                  {/* Hover Arrow */}
                  <div className="flex items-center justify-center space-x-2 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Explore</span>
                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>View All Products</span>
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
