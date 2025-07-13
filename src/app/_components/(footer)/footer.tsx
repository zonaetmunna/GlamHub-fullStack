"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing!");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blogs" },
  ];

  const customerService = [
    { name: "Help Center", href: "/faq" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Track Order", href: "/track-order" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold">GlamHub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for premium beauty products and
              professional beauty services. Discover the latest trends and
              elevate your beauty routine.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4 text-pink-500" />
                <span>123 Beauty Avenue, New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <FaPhone className="w-4 h-4 text-pink-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <FaEnvelope className="w-4 h-4 text-pink-500" />
                <span>support@glamhub.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for exclusive offers and beauty tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-r-md transition-all duration-200 disabled:opacity-50"
                >
                  {isSubscribing ? "..." : "Subscribe"}
                </button>
              </div>
            </form>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="font-medium">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-200"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-200"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
              {legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-pink-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>&copy; 2024 GlamHub. Made with</span>
              <FaHeart className="w-4 h-4 text-pink-500" />
              <span>for beauty lovers</span>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex justify-center items-center space-x-8 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-6 bg-gray-600 rounded flex items-center justify-center">
                SSL
              </span>
              <span>Secure Shopping</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-6 bg-gray-600 rounded flex items-center justify-center">
                ✓
              </span>
              <span>Money Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-6 bg-gray-600 rounded flex items-center justify-center">
                🚚
              </span>
              <span>Free Shipping Over $50</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
