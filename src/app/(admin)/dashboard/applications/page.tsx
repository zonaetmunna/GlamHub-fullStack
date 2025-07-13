"use client";

import {
  Application,
  useGetApplicationsQuery,
} from "@/features/applications/applicationApiSlice";
import Link from "next/link";
import { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaEdit,
  FaEye,
  FaFile,
  FaFilter,
  FaSearch,
  FaTimesCircle,
  FaTrash,
  FaUser,
} from "react-icons/fa";

export default function ApplicationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: applicationsData,
    isLoading,
    error,
    refetch,
  } = useGetApplicationsQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery,
    status: statusFilter,
    jobId: jobFilter,
    date: dateFilter,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case "status":
        setStatusFilter(value);
        break;
      case "job":
        setJobFilter(value);
        break;
      case "date":
        setDateFilter(value);
        break;
    }
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";
      case "REVIEWING":
        return "bg-blue-500/20 text-blue-400";
      case "INTERVIEW":
        return "bg-purple-500/20 text-purple-400";
      case "ACCEPTED":
        return "bg-green-500/20 text-green-400";
      case "REJECTED":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return <FaCheckCircle className="w-4 h-4" />;
      case "REJECTED":
        return <FaTimesCircle className="w-4 h-4" />;
      case "INTERVIEW":
      case "REVIEWING":
        return <FaEye className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
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
        <div className="text-red-400 text-lg mb-4">
          Failed to load applications
        </div>
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
            Applications Management
          </h1>
          <p className="text-gray-400">
            Manage job applications and candidate tracking
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Applications</p>
              <p className="text-2xl font-bold text-white">
                {applicationsData?.pagination?.totalCount || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaFile className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-white">
                {applicationsData?.data?.filter(
                  (app: Application) => app.status === "PENDING"
                ).length || 0}
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <FaClock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Interviews</p>
              <p className="text-2xl font-bold text-white">
                {applicationsData?.data?.filter(
                  (app: Application) => app.status === "INTERVIEW"
                ).length || 0}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FaUser className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Accepted</p>
              <p className="text-2xl font-bold text-white">
                {applicationsData?.data?.filter(
                  (app: Application) => app.status === "ACCEPTED"
                ).length || 0}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FaCheckCircle className="w-6 h-6 text-green-400" />
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
              placeholder="Search applicants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEWING">Reviewing</option>
              <option value="INTERVIEW">Interview</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => handleFilterChange("date", e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
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

      {/* Applications Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="text-left p-4 font-medium text-white">
                  Applicant
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Position
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Applied Date
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Experience
                </th>
                <th className="text-left p-4 font-medium text-white">Status</th>
                <th className="text-left p-4 font-medium text-white">Resume</th>
                <th className="text-left p-4 font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applicationsData?.data?.map((application: Application) => (
                <tr key={application.id} className="border-t border-white/10">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {application.applicantName?.charAt(0) || "A"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {application.applicantName}
                        </p>
                        <p className="text-sm text-gray-400">
                          {application.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-white">
                        {application.job?.title || "Unknown Position"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {application.job?.department}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(application.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white">
                      {application.experience || "Not specified"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center space-x-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {getStatusIcon(application.status)}
                      <span>{application.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {application.resumeUrl ? (
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <FaFile className="w-4 h-4" />
                        <span>View Resume</span>
                      </a>
                    ) : (
                      <span className="text-gray-500">No resume</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/applications/${application.id}`}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <FaEye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/dashboard/applications/${application.id}/edit`}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
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
        {applicationsData?.pagination && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing{" "}
                {(applicationsData.pagination.page - 1) *
                  applicationsData.pagination.limit +
                  1}{" "}
                to{" "}
                {Math.min(
                  applicationsData.pagination.page *
                    applicationsData.pagination.limit,
                  applicationsData.pagination.totalCount
                )}{" "}
                of {applicationsData.pagination.totalCount} applications
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!applicationsData.pagination.hasPreviousPage}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {applicationsData.pagination.page} of{" "}
                  {applicationsData.pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!applicationsData.pagination.hasNextPage}
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
