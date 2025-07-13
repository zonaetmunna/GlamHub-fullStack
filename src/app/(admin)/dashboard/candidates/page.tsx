"use client";

import { useGetApplicationsQuery } from "@/features/applications/applicationApiSlice";
import Link from "next/link";
import { useState } from "react";
import {
  FaCheckCircle,
  FaDownload,
  FaEdit,
  FaEnvelope,
  FaEye,
  FaFileAlt,
  FaFilter,
  FaPhone,
  FaSearch,
  FaTimesCircle,
  FaUser,
  FaUserCheck,
  FaUserGraduate,
} from "react-icons/fa";

export default function CandidatesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: candidatesData,
    isLoading,
    error,
    refetch,
  } = useGetApplicationsQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery,
    status: statusFilter,
    jobId: jobFilter,
    sortBy,
    sortOrder,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-500/20 text-green-400";
      case "SHORTLISTED":
        return "bg-blue-500/20 text-blue-400";
      case "REVIEWED":
        return "bg-purple-500/20 text-purple-400";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";
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
      case "SHORTLISTED":
        return <FaUserCheck className="w-4 h-4" />;
      case "REVIEWED":
        return <FaEye className="w-4 h-4" />;
      case "PENDING":
        return <FaUser className="w-4 h-4" />;
      case "REJECTED":
        return <FaTimesCircle className="w-4 h-4" />;
      default:
        return <FaUser className="w-4 h-4" />;
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
          Failed to load candidates data
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
            Candidate Management
          </h1>
          <p className="text-gray-400">
            Track and manage job applicants and candidates
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            <FaDownload className="w-4 h-4" />
            <span>Export Report</span>
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
                {candidatesData?.pagination?.totalCount || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaUser className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Shortlisted</p>
              <p className="text-2xl font-bold text-white">
                {candidatesData?.data?.filter(
                  (candidate) => candidate.status === "SHORTLISTED"
                ).length || 0}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FaUserCheck className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-white">
                {candidatesData?.data?.filter(
                  (candidate) => candidate.status === "PENDING"
                ).length || 0}
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <FaUserGraduate className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Hired</p>
              <p className="text-2xl font-bold text-white">
                {candidatesData?.data?.filter(
                  (candidate) => candidate.status === "ACCEPTED"
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
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search candidates by name, email, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Candidates Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="text-left p-4 font-medium text-white">
                  Candidate
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Applied For
                </th>
                <th className="text-left p-4 font-medium text-white">
                  Contact
                </th>
                <th className="text-left p-4 font-medium text-white">
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center space-x-1 hover:text-pink-400 transition-colors"
                  >
                    <span>Applied Date</span>
                    {sortBy === "createdAt" && (
                      <span className="text-pink-400">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-white">Status</th>
                <th className="text-left p-4 font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {candidatesData?.data?.map((candidate) => (
                <tr key={candidate.id} className="border-t border-white/10">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {candidate.user?.name?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {candidate.user?.name || "Unknown Candidate"}
                        </p>
                        <p className="text-sm text-gray-400">
                          #{candidate.id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-white">
                        {candidate.job?.title || "Unknown Position"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {candidate.job?.department || "General"}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="w-3 h-3 text-gray-400" />
                        <span className="text-white text-sm">
                          {candidate.user?.email}
                        </span>
                      </div>
                      {candidate.user?.phone && (
                        <div className="flex items-center space-x-2">
                          <FaPhone className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400 text-sm">
                            {candidate.user.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">
                      {new Date(candidate.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(candidate.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center space-x-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                        candidate.status
                      )}`}
                    >
                      {getStatusIcon(candidate.status)}
                      <span>{candidate.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/candidates/${candidate.id}`}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <FaEye className="w-4 h-4" />
                      </Link>
                      {candidate.resumeUrl && (
                        <a
                          href={candidate.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <FaFileAlt className="w-4 h-4" />
                        </a>
                      )}
                      <Link
                        href={`/dashboard/candidates/${candidate.id}/edit`}
                        className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {candidatesData?.pagination && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing{" "}
                {(candidatesData.pagination.page - 1) *
                  candidatesData.pagination.limit +
                  1}{" "}
                to{" "}
                {Math.min(
                  candidatesData.pagination.page *
                    candidatesData.pagination.limit,
                  candidatesData.pagination.totalCount
                )}{" "}
                of {candidatesData.pagination.totalCount} candidates
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!candidatesData.pagination.hasPreviousPage}
                  className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {candidatesData.pagination.page} of{" "}
                  {candidatesData.pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!candidatesData.pagination.hasNextPage}
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
