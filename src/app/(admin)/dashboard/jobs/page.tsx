"use client";

import { useGetJobsQuery } from "@/features/jobs/jobApiSlice";
import Link from "next/link";
import { useState } from "react";
import {
  FaBriefcase,
  FaDownload,
  FaEdit,
  FaEye,
  FaFilter,
  FaMapMarkerAlt,
  FaPlus,
  FaSearch,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
  FaUsers,
} from "react-icons/fa";

export default function JobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: jobsData,
    isLoading,
    error,
    refetch,
  } = useGetJobsQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery,
    department: departmentFilter,
    type: typeFilter,
    isActive: statusFilter ? statusFilter === "active" : undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case "department":
        setDepartmentFilter(value);
        break;
      case "type":
        setTypeFilter(value);
        break;
      case "status":
        setStatusFilter(value);
        break;
    }
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

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "FULL_TIME":
        return "bg-green-500/20 text-green-400";
      case "PART_TIME":
        return "bg-blue-500/20 text-blue-400";
      case "CONTRACT":
        return "bg-yellow-500/20 text-yellow-400";
      case "INTERNSHIP":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case "ENTRY":
        return "text-green-400";
      case "MID":
        return "text-blue-400";
      case "SENIOR":
        return "text-purple-400";
      case "LEAD":
        return "text-pink-400";
      default:
        return "text-gray-400";
    }
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
        <div className="text-red-400 text-lg mb-4">Failed to load jobs</div>
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
            Jobs Management
          </h1>
          <p className="text-gray-400">
            Manage career opportunities and job listings
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Link
            href="/dashboard/jobs/add"
            className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add Job</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Jobs</p>
              <p className="text-2xl font-bold text-white">
                {jobsData?.pagination?.totalCount || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaBriefcase className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Jobs</p>
              <p className="text-2xl font-bold text-white">
                {jobsData?.data?.filter((job) => job.isActive).length || 0}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FaToggleOn className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Applications</p>
              <p className="text-2xl font-bold text-white">
                {jobsData?.data?.reduce(
                  (sum, job) => sum + (job.applicationCount || 0),
                  0
                ) || 0}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FaUsers className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Remote Jobs</p>
              <p className="text-2xl font-bold text-white">
                {jobsData?.data?.filter((job) => job.location === "Remote")
                  .length || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <FaMapMarkerAlt className="w-6 h-6 text-orange-400" />
            </div>
          </div>
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
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(e) => handleFilterChange("department", e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Departments</option>
              <option value="BEAUTY">Beauty</option>
              <option value="WELLNESS">Wellness</option>
              <option value="CUSTOMER_SERVICE">Customer Service</option>
              <option value="MARKETING">Marketing</option>
              <option value="TECHNOLOGY">Technology</option>
              <option value="MANAGEMENT">Management</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Types</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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

      {/* Jobs Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="text-left p-4 font-medium text-white">
                  Job Title
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Department
                </th>
                <th className="text-left p-4 font-medium text-white">Type</th>
                <th className="text-left p-4 font-medium text-white">
                  Location
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Experience
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Applications
                </th>
                <th className="text-left p-4 font-medium text-white">Status</th>
                <th className="text-left p-4 font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobsData?.data?.map((job) => (
                <tr key={job.id} className="border-t border-white/10">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-white">{job.title}</p>
                      <p className="text-sm text-gray-400">
                        ${job.salary?.toLocaleString() || "Not specified"}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white">{job.department}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getJobTypeColor(
                        job.type
                      )}`}
                    >
                      {job.type.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{job.location}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-medium ${getExperienceColor(
                        job.experienceLevel
                      )}`}
                    >
                      {job.experienceLevel}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-white">
                      {job.applicationCount || 0}
                    </span>
                  </td>
                  <td className="p-4">
                    {job.isActive ? (
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 text-xs rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 text-xs rounded-full">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/jobs/${job.id}`}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <FaEye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/dashboard/jobs/${job.id}/edit`}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors">
                        {job.isActive ? (
                          <FaToggleOff className="w-4 h-4" />
                        ) : (
                          <FaToggleOn className="w-4 h-4" />
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
        {jobsData?.pagination && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing{" "}
                {(jobsData.pagination.page - 1) * jobsData.pagination.limit + 1}{" "}
                to{" "}
                {Math.min(
                  jobsData.pagination.page * jobsData.pagination.limit,
                  jobsData.pagination.totalCount
                )}{" "}
                of {jobsData.pagination.totalCount} jobs
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!jobsData.pagination.hasPreviousPage}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {jobsData.pagination.page} of{" "}
                  {jobsData.pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!jobsData.pagination.hasNextPage}
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
