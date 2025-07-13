"use client";

import { useGetUsersQuery } from "@/features/users/userApiSlice";
import Link from "next/link";
import { useState } from "react";
import {
  FaDownload,
  FaEdit,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
  FaUserShield,
} from "react-icons/fa";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: usersData,
    isLoading,
    error,
    refetch,
  } = useGetUsersQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery,
    role: roleFilter,
    isActive: statusFilter ? statusFilter === "active" : undefined,
    sortBy,
    sortOrder,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-500/20 text-purple-400";
      case "STAFF":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">Failed to load users</div>
        <button
          onClick={() => refetch()}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Users Management
          </h1>
          <p className="text-gray-400">Manage users, roles, and permissions</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Link
            href="/dashboard/users/add"
            className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add User</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col lg:flex-row gap-4"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
              <option value="USER">User</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="text-left p-4 font-medium text-white">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center space-x-1 hover:text-pink-400 transition-colors"
                  >
                    <span>Name</span>
                    {sortBy === "name" && (
                      <span className="text-pink-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-white">
                  <button
                    onClick={() => handleSort("email")}
                    className="flex items-center space-x-1 hover:text-pink-400 transition-colors"
                  >
                    <span>Email</span>
                    {sortBy === "email" && (
                      <span className="text-pink-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-white">
                  <button
                    onClick={() => handleSort("role")}
                    className="flex items-center space-x-1 hover:text-pink-400 transition-colors"
                  >
                    <span>Role</span>
                    {sortBy === "role" && (
                      <span className="text-pink-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-white">Status</th>
                <th className="text-left p-4 font-medium text-white">
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center space-x-1 hover:text-pink-400 transition-colors"
                  >
                    <span>Joined</span>
                    {sortBy === "createdAt" && (
                      <span className="text-pink-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData?.data?.map((user: IUser) => (
                <tr key={user.id} className="border-t border-white/10">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        user.isActive
                      )}`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-white">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/users/${user.id}`}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <FaEye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/dashboard/users/${user.id}/edit`}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                        <FaUserShield className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors">
                        {user.isActive ? (
                          <FaToggleOn className="w-4 h-4" />
                        ) : (
                          <FaToggleOff className="w-4 h-4" />
                        )}
                      </button>
                      <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {usersData?.pagination && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing{" "}
                {(usersData.pagination.page - 1) * usersData.pagination.limit +
                  1}{" "}
                to{" "}
                {Math.min(
                  usersData.pagination.page * usersData.pagination.limit,
                  usersData.pagination.totalCount
                )}{" "}
                of {usersData.pagination.totalCount} users
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!usersData.pagination.hasPreviousPage}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {usersData.pagination.page} of{" "}
                  {usersData.pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!usersData.pagination.hasNextPage}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
