"use client";

import { useAppSelector } from "@/features/hooks";
import { useGetNotificationsQuery } from "@/features/notifications/notificationApiSlice";
import Link from "next/link";
import { useState } from "react";
import {
  FaBell,
  FaCog,
  FaCompress,
  FaExpand,
  FaMoon,
  FaSearch,
  FaSignOutAlt,
  FaSun,
  FaUser,
} from "react-icons/fa";

export default function DashboardNavbar() {
  const { user } = useAppSelector((state) => state.auth);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: notificationsData } = useGetNotificationsQuery({
    page: 1,
    limit: 5,
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const unreadNotifications =
    notificationsData?.data?.filter((n) => !n.isRead) || [];

  return (
    <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-300 hover:text-white"
          >
            {isDarkMode ? (
              <FaSun className="w-5 h-5" />
            ) : (
              <FaMoon className="w-5 h-5" />
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-300 hover:text-white"
          >
            {isFullscreen ? (
              <FaCompress className="w-5 h-5" />
            ) : (
              <FaExpand className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-gray-300 hover:text-white relative"
            >
              <FaBell className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-white/20">
                  <h3 className="text-lg font-semibold text-white">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notificationsData?.data &&
                  notificationsData.data.length > 0 ? (
                    notificationsData.data.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-white/10 hover:bg-white/5 cursor-pointer ${
                          !notification.isRead ? "bg-white/5" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(
                                notification.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-400">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-white/20">
                  <Link
                    href="/dashboard/notifications"
                    className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-400">
                  {user?.role || "Administrator"}
                </p>
              </div>
            </button>

            {/* User Dropdown */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user?.name?.charAt(0) || "A"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user?.name || "Admin"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user?.email || "admin@glamhub.com"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <FaUser className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/setting"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <FaCog className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
