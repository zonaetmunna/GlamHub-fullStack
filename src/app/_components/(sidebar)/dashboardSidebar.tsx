"use client";

import { useAppSelector } from "@/features/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaCog,
  FaComments,
  FaHome,
  FaShoppingBag,
  FaSignOutAlt,
  FaSpa,
  FaUsers,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function DashboardSidebar() {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaHome className="w-5 h-5" />,
      path: "/dashboard",
      submenu: [],
    },
    {
      id: "products",
      label: "Products",
      icon: <FaShoppingBag className="w-5 h-5" />,
      path: "/dashboard/product",
      submenu: [
        { label: "All Products", path: "/dashboard/product" },
        { label: "Add Product", path: "/dashboard/product/add" },
        { label: "Product Categories", path: "/dashboard/category" },
        { label: "Brands", path: "/dashboard/brand" },
        { label: "Inventory", path: "/dashboard/inventory" },
      ],
    },
    {
      id: "services",
      label: "Services",
      icon: <FaSpa className="w-5 h-5" />,
      path: "/dashboard/services",
      submenu: [
        { label: "All Services", path: "/dashboard/services" },
        { label: "Add Service", path: "/dashboard/services/add" },
        { label: "Service Categories", path: "/dashboard/services/categories" },
        { label: "Service Bookings", path: "/dashboard/services/bookings" },
      ],
    },
    {
      id: "orders",
      label: "Orders",
      icon: <FaClipboardList className="w-5 h-5" />,
      path: "/dashboard/order",
      submenu: [
        { label: "All Orders", path: "/dashboard/order" },
        { label: "Pending Orders", path: "/dashboard/order/pending" },
        { label: "Completed Orders", path: "/dashboard/order/completed" },
        { label: "Invoices", path: "/dashboard/invoice" },
        { label: "Payments", path: "/dashboard/payments" },
      ],
    },
    {
      id: "users",
      label: "Users",
      icon: <FaUsers className="w-5 h-5" />,
      path: "/dashboard/users",
      submenu: [
        { label: "All Users", path: "/dashboard/users" },
        { label: "Customers", path: "/dashboard/customers" },
        { label: "Staff Management", path: "/dashboard/staff" },
        { label: "Admin Management", path: "/dashboard/make-admin" },
      ],
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: <FaCalendarAlt className="w-5 h-5" />,
      path: "/dashboard/appointments",
      submenu: [
        { label: "All Appointments", path: "/dashboard/appointments" },
        { label: "Today's Schedule", path: "/dashboard/appointments/today" },
        { label: "Calendar View", path: "/dashboard/appointments/calendar" },
        {
          label: "Appointment Settings",
          path: "/dashboard/appointments/settings",
        },
      ],
    },
    {
      id: "jobs",
      label: "Jobs & Careers",
      icon: <FaBriefcase className="w-5 h-5" />,
      path: "/dashboard/jobs",
      submenu: [
        { label: "Job Listings", path: "/dashboard/jobs" },
        { label: "Add Job", path: "/dashboard/jobs/add" },
        { label: "Applications", path: "/dashboard/applications" },
        { label: "Candidates", path: "/dashboard/candidates" },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <FaChartLine className="w-5 h-5" />,
      path: "/dashboard/analytics",
      submenu: [
        { label: "Business Overview", path: "/dashboard/analytics" },
        { label: "Sales Analytics", path: "/dashboard/analytics/sales" },
        { label: "User Analytics", path: "/dashboard/analytics/users" },
        { label: "Product Analytics", path: "/dashboard/analytics/products" },
        { label: "Service Analytics", path: "/dashboard/analytics/services" },
      ],
    },
    {
      id: "communications",
      label: "Communications",
      icon: <FaComments className="w-5 h-5" />,
      path: "/dashboard/communications",
      submenu: [
        { label: "Messages", path: "/dashboard/message" },
        { label: "Notifications", path: "/dashboard/notifications" },
        { label: "Email Templates", path: "/dashboard/email-templates" },
        { label: "SMS Settings", path: "/dashboard/sms" },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FaCog className="w-5 h-5" />,
      path: "/dashboard/setting",
      submenu: [
        { label: "General Settings", path: "/dashboard/setting" },
        { label: "Site Configuration", path: "/dashboard/setting/site" },
        { label: "Payment Settings", path: "/dashboard/setting/payment" },
        { label: "Security Settings", path: "/dashboard/setting/security" },
        { label: "Email Settings", path: "/dashboard/setting/email" },
      ],
    },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300 ease-in-out h-screen`}
    >
      <div className="h-full bg-white/5 backdrop-blur-sm border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-white font-bold text-xl">GlamHub</span>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
          </div>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email || "admin@glamhub.com"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Main Menu Item */}
              {item.submenu.length > 0 ? (
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white"
                      : "text-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <div className="text-gray-400">
                      {openMenus[item.id] ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  )}
                </button>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white"
                      : "text-gray-300"
                  }`}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              )}

              {/* Submenu */}
              {item.submenu.length > 0 &&
                openMenus[item.id] &&
                !isCollapsed && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                          isActive(subItem.path)
                            ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white"
                            : "text-gray-400"
                        }`}
                      >
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span className="text-sm">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200">
            <FaSignOutAlt className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
