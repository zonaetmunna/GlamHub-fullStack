"use client";

import {
  FaAward,
  FaHeadset,
  FaHeart,
  FaShieldAlt,
  FaShippingFast,
  FaUndoAlt,
} from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaShippingFast className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50 worldwide",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% secure payment with SSL encryption",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaUndoAlt className="w-8 h-8" />,
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Only authentic, high-quality products",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Loyalty Rewards",
      description: "Earn points with every purchase",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="relative bg-gray-900 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
              GlamHub
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the ultimate in beauty shopping with our premium features
            and services
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Icon Container */}
              <div
                className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-pink-400">✨</span>
            <span className="text-white text-sm font-medium">
              Trusted by 10,000+ beauty enthusiasts worldwide
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
