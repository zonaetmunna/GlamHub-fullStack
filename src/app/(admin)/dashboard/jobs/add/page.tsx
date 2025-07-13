"use client";

import { useCreateJobMutation } from "@/features/jobs/jobApiSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaDollarSign,
  FaMapMarkerAlt,
  FaSave,
  FaTags,
} from "react-icons/fa";

export default function AddJobPage() {
  const router = useRouter();
  const [createJob, { isLoading }] = useCreateJobMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    salary: "",
    status: "ACTIVE",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";
    if (!formData.requirements.trim())
      newErrors.requirements = "Requirements are required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.jobType) newErrors.jobType = "Job type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createJob({
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        location: formData.location,
        jobType: formData.jobType as any,
        salary: formData.salary || undefined,
        status: formData.status as any,
      }).unwrap();

      router.push("/dashboard/jobs");
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Add New Job</h1>
            <p className="text-gray-400">Create a new job listing</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full bg-white/10 border ${
                    errors.title ? "border-red-500" : "border-white/20"
                  } rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  placeholder="Enter job title"
                />
                <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full bg-white/10 border ${
                    errors.location ? "border-red-500" : "border-white/20"
                  } rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  placeholder="Enter job location"
                />
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {errors.location && (
                <p className="text-red-400 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Type *
              </label>
              <div className="relative">
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className={`w-full bg-white/10 border ${
                    errors.jobType ? "border-red-500" : "border-white/20"
                  } rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
                >
                  <option value="">Select job type</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
                <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {errors.jobType && (
                <p className="text-red-400 text-sm mt-1">{errors.jobType}</p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Salary (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., $50,000 - $70,000"
                />
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              className={`w-full bg-white/10 border ${
                errors.description ? "border-red-500" : "border-white/20"
              } rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Describe the job role, responsibilities, and what the ideal candidate will do..."
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Requirements *
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={4}
              className={`w-full bg-white/10 border ${
                errors.requirements ? "border-red-500" : "border-white/20"
              } rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="List the required skills, experience, education, and qualifications..."
            />
            {errors.requirements && (
              <p className="text-red-400 text-sm mt-1">{errors.requirements}</p>
            )}
          </div>

          {/* Job Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="ACTIVE">Active</option>
              <option value="DRAFT">Draft</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="w-4 h-4" />
              <span>{isLoading ? "Creating..." : "Create Job"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
