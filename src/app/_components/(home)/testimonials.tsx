"use client";

import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Beauty Enthusiast",
      image: "/api/placeholder/64/64",
      rating: 5,
      review:
        "GlamHub has completely transformed my beauty routine! The quality of products is outstanding and the customer service is exceptional. I've never been happier with my purchases.",
      product: "Luxury Skincare Set",
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      role: "Makeup Artist",
      image: "/api/placeholder/64/64",
      rating: 5,
      review:
        "As a professional makeup artist, I trust GlamHub for all my client needs. Their curated selection of premium products never disappoints, and the fast shipping is a game-changer.",
      product: "Professional Makeup Kit",
    },
    {
      id: 3,
      name: "Lisa Chen",
      role: "Skincare Specialist",
      image: "/api/placeholder/64/64",
      rating: 5,
      review:
        "The personalized recommendations and expert advice from GlamHub have helped me discover products I never knew I needed. My skin has never looked better!",
      product: "Anti-Aging Serum",
    },
    {
      id: 4,
      name: "Maria Garcia",
      role: "Fashion Blogger",
      image: "/api/placeholder/64/64",
      rating: 5,
      review:
        "GlamHub is my go-to for all beauty needs. The loyalty program is amazing, and I love getting early access to new products. Highly recommended!",
      product: "Limited Edition Collection",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative bg-black py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,_rgba(219,39,119,0.1),_transparent_60%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,_rgba(147,51,234,0.1),_transparent_60%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
              Customers
            </span>{" "}
            Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust GlamHub for their
            beauty needs
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5"></div>

            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-pink-400/30">
              <FaQuoteLeft className="w-12 h-12" />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: testimonials[currentIndex].rating }).map(
                  (_, i) => (
                    <FaStar key={i} className="w-6 h-6 text-yellow-400 mx-1" />
                  )
                )}
              </div>

              {/* Review */}
              <blockquote className="text-xl md:text-2xl text-white text-center mb-8 leading-relaxed">
                &quot;{testimonials[currentIndex].review}&quot;
              </blockquote>

              {/* Product */}
              <div className="text-center mb-8">
                <span className="inline-block bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm rounded-full px-4 py-2 text-pink-400 text-sm font-medium border border-white/20">
                  {testimonials[currentIndex].product}
                </span>
              </div>

              {/* Author */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-semibold text-lg">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-400">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-pink-500 to-purple-600"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99%</div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
