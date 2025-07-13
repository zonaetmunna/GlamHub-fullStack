"use client";

import { useGetAdminDashboardQuery } from "@/features/admin/adminApiSlice";
import { useGetAppointmentsQuery } from "@/features/appointments/appointmentApiSlice";
import { useGetOrdersQuery } from "@/features/orders/orderApiSlice";
import { useGetProductsQuery } from "@/features/products/productApiSlice";
import { useGetUsersQuery } from "@/features/users/userApiSlice";
import Link from "next/link";
import {
  FaArrowDown,
  FaArrowUp,
  FaBox,
  FaCalendarAlt,
  FaChartLine,
  FaClipboardList,
  FaDollarSign,
  FaEye,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";

export default function Dashboard() {
  const { data: dashboardData, isLoading: dashboardLoading } =
    useGetAdminDashboardQuery();
  const { data: productsData } = useGetProductsQuery({ page: 1, limit: 5 });
  const { data: usersData } = useGetUsersQuery({ page: 1, limit: 5 });
  const { data: ordersData } = useGetOrdersQuery({ page: 1, limit: 5 });
  const { data: appointmentsData } = useGetAppointmentsQuery({
    page: 1,
    limit: 5,
  });

  const stats = [
    {
      title: "Total Revenue",
      value: dashboardData?.data?.overview?.totalRevenue || 0,
      icon: <FaDollarSign className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      change: "+12.5%",
      trend: "up",
      prefix: "$",
    },
    {
      title: "Total Orders",
      value: dashboardData?.data?.overview?.totalOrders || 0,
      icon: <FaClipboardList className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Total Users",
      value: dashboardData?.data?.overview?.totalUsers || 0,
      icon: <FaUsers className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      change: "+15.3%",
      trend: "up",
    },
    {
      title: "Total Products",
      value: dashboardData?.data?.overview?.totalProducts || 0,
      icon: <FaShoppingBag className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      change: "+5.1%",
      trend: "up",
    },
    {
      title: "Appointments",
      value: dashboardData?.data?.appointments?.today || 0,
      icon: <FaCalendarAlt className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      change: "+3.7%",
      trend: "up",
      suffix: " today",
    },
    {
      title: "Low Stock Products",
      value: dashboardData?.data?.products?.lowStock || 0,
      icon: <FaBox className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      change: "-2.1%",
      trend: "down",
    },
  ];

  const quickActions = [
    {
      title: "Add Product",
      description: "Create a new product",
      href: "/dashboard/product/add",
      icon: <FaShoppingBag className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "View Orders",
      description: "Manage customer orders",
      href: "/dashboard/order",
      icon: <FaClipboardList className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "User Management",
      description: "Manage users and permissions",
      href: "/dashboard/users",
      icon: <FaUsers className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Analytics",
      description: "View detailed analytics",
      href: "/dashboard/analytics",
      icon: <FaChartLine className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  if (dashboardLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-400">
          Manage your GlamHub platform with powerful admin tools
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-right">
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <FaArrowUp className="w-3 h-3" />
                  ) : (
                    <FaArrowDown className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold text-white">
                {stat.prefix}
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
                {stat.suffix}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="group bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}
                >
                  <div className="text-white">{action.icon}</div>
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-pink-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
            <Link
              href="/dashboard/order"
              className="text-pink-400 hover:text-pink-300 text-sm flex items-center space-x-1"
            >
              <span>View all</span>
              <FaEye className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {ordersData?.data?.slice(0, 5).map((order: IOrder) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    Order #{order.id.slice(-8)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {order.user?.name || "Unknown User"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                  <p
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "DELIVERED"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            )) || (
              <div className="text-center text-gray-400 py-8">
                No recent orders
              </div>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Users</h2>
            <Link
              href="/dashboard/users"
              className="text-pink-400 hover:text-pink-300 text-sm flex items-center space-x-1"
            >
              <span>View all</span>
              <FaEye className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {usersData?.data?.slice(0, 5).map((user: IUser) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xs px-2 py-1 rounded-full ${
                      user.role === "ADMIN"
                        ? "bg-purple-500/20 text-purple-400"
                        : user.role === "STAFF"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {user.role}
                  </p>
                </div>
              </div>
            )) || (
              <div className="text-center text-gray-400 py-8">
                No recent users
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-white">Database</p>
              <p className="text-xs text-gray-400">Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-white">Payment Gateway</p>
              <p className="text-xs text-gray-400">Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-white">Email Service</p>
              <p className="text-xs text-gray-400">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
