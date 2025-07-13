"use client";

import {
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
} from "@/features/services/serviceCategoryApiSlice";
import { useEffect, useState } from "react";
import { FaSave, FaTag, FaTimes } from "react-icons/fa";

interface ServiceCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: {
    id: string;
    name: string;
    description?: string;
    color: string;
    isActive: boolean;
  };
  onSuccess?: () => void;
}

export default function ServiceCategoryModal({
  isOpen,
  onClose,
  category,
  onSuccess,
}: ServiceCategoryModalProps) {
  const [createCategory, { isLoading: isCreating }] =
    useCreateServiceCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateServiceCategoryMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#ec4899", // Default pink color
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isLoading = isCreating || isUpdating;
  const isEdit = !!category;

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        color: category.color,
        isActive: category.isActive,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        color: "#ec4899",
        isActive: true,
      });
    }
    setErrors({});
  }, [category, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (formData.name.trim().length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isEdit && category) {
        await updateCategory({
          id: category.id,
          data: formData,
        }).unwrap();
      } else {
        await createCategory(formData).unwrap();
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to save category:", error);
      setErrors({ submit: "Failed to save category. Please try again." });
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      color: "#ec4899",
      isActive: true,
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <FaTag className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              {isEdit ? "Edit Category" : "Add New Category"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full bg-white/5 border ${
                errors.name ? "border-red-500" : "border-white/20"
              } rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500`}
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter category description"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-12 h-12 rounded-lg border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="flex-1 bg-white/5 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="#ec4899"
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4 text-pink-500 bg-white/5 border border-white/20 rounded focus:ring-pink-500"
            />
            <label className="text-sm font-medium text-gray-300">
              Active Category
            </label>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="w-4 h-4" />
              <span>
                {isLoading ? "Saving..." : isEdit ? "Update" : "Create"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
