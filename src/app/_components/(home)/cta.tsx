"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaGift,
  FaShoppingBag,
} from "react-icons/fa";

export default function CTA() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(219,39,119,0.15),_transparent_70%)]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(147,51,234,0.15),_transparent_70%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.15),_transparent_70%)]"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
              Beauty Experience?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of beauty enthusiasts who trust GlamHub for their
            premium beauty needs. Start your transformation today.
          </p>

          {/* Primary CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/products"
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-5 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-pink-500/25"
            >
              <FaShoppingBag className="w-6 h-6" />
              <span>Shop Now</span>
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/services"
              className="group inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-12 py-5 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <FaCalendarAlt className="w-6 h-6" />
              <span>Book Service</span>
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Free Shipping */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Free Shipping
            </h3>
            <p className="text-gray-400">On orders over $50</p>
          </div>

          {/* Premium Service */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Expert Services
            </h3>
            <p className="text-gray-400">Professional beauty treatments</p>
          </div>

          {/* Loyalty Program */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Loyalty Rewards
            </h3>
            <p className="text-gray-400">Earn points with every purchase</p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stay Updated with Beauty Trends
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get exclusive offers, beauty tips, and early access to new products
            delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
