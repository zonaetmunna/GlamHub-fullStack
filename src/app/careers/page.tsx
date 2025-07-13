"use client";

import { useGetJobsQuery } from "@/features/jobs/jobApiSlice";
import Link from "next/link";
import { useState } from "react";
import {
  FaArrowRight,
  FaBriefcase,
  FaDollarSign,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { HiOutlineAdjustments } from "react-icons/hi";

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: jobsData,
    isLoading: jobsLoading,
    error: jobsError,
  } = useGetJobsQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery,
    type: selectedType,
    location: selectedLocation,
    department: selectedDepartment,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("");
    setSelectedLocation("");
    setSelectedDepartment("");
    setCurrentPage(1);
  };

  const jobTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];

  const departments = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "Operations",
    "HR",
  ];

  const locations = [
    "New York, NY",
    "San Francisco, CA",
    "Los Angeles, CA",
    "Chicago, IL",
    "Remote",
    "Austin, TX",
  ];

  const formatJobType = (type: string) => {
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join the GlamHub Team
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Help us revolutionize the beauty industry. Find your dream job and
              grow your career with us.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto relative"
            >
              <input
                type="text"
                placeholder="Search jobs by title, keyword, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
              <div className="text-gray-600">Open Positions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">200+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">15+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">4.8★</div>
              <div className="text-gray-600">Employee Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <HiOutlineAdjustments className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {(searchQuery ||
                selectedType ||
                selectedLocation ||
                selectedDepartment) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-pink-600 hover:text-pink-700 transition-colors"
                >
                  Clear all
                </button>
              )}

              <div className="text-sm text-gray-600">
                {jobsData?.pagination.totalCount || 0} jobs found
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">All Types</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {formatJobType(type)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobsLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))
          ) : jobsError ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">Failed to load jobs</p>
            </div>
          ) : jobsData?.data.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            jobsData?.data.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.type === "FULL_TIME"
                            ? "bg-green-100 text-green-800"
                            : job.type === "PART_TIME"
                            ? "bg-blue-100 text-blue-800"
                            : job.type === "CONTRACT"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {formatJobType(job.type)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <FaBriefcase className="w-4 h-4" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaDollarSign className="w-4 h-4" />
                        <span>
                          ${job.salary.min.toLocaleString()} - $
                          {job.salary.max.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    {job.benefits && job.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.benefits.slice(0, 3).map((benefit, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-pink-50 text-pink-700 rounded-md text-sm"
                          >
                            {benefit}
                          </span>
                        ))}
                        {job.benefits.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
                            +{job.benefits.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                      {job.expiresAt && (
                        <>
                          {" "}
                          • Expires{" "}
                          {new Date(job.expiresAt).toLocaleDateString()}
                        </>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/careers/${job.id}`}
                    className="ml-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-md hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>Apply Now</span>
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {jobsData?.pagination && jobsData.pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from(
                { length: Math.min(5, jobsData.pagination.totalPages) },
                (_, i) => {
                  const startPage = Math.max(1, currentPage - 2);
                  const pageNumber = startPage + i;

                  if (pageNumber > jobsData.pagination.totalPages) return null;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-2 rounded-md ${
                        pageNumber === currentPage
                          ? "bg-pink-500 text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
              )}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === jobsData.pagination.totalPages}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Why Work With Us Section */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Work at GlamHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth & Learning</h3>
              <p className="text-gray-600">
                Continuous learning opportunities with training budgets and
                mentorship programs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Culture</h3>
              <p className="text-gray-600">
                Inclusive, diverse, and collaborative environment where everyone
                thrives.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Benefits</h3>
              <p className="text-gray-600">
                Comprehensive health insurance, flexible PTO, and remote work
                options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
