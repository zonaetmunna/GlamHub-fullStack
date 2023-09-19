"use client";

import AddCategoryModal from "@/app/_components/(modal)/addCategoryModal";
import DeleteCategoryModal from "@/app/_components/(modal)/deleteCategoryModal";
import UpdateCategoryModal from "@/app/_components/(modal)/updateCategoryModal";
import { useEffect, useMemo, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

const API_BASE_URL = "http://localhost:3000/api/categories";

export default function Category() {
  // sate for categories
  const [categories, setCategories] = useState<ICategory[]>([]);
  // state for modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // state for selected category search and pagination
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    // Fetch the list of categories when the page loads
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    let filtered = categories;

    // Filter by search text
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter((category) =>
        category.name.toLowerCase().includes(lowerSearchText)
      );
    }

    return filtered;
  }, [categories, searchText]);

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCategories = filteredCategories.slice(startIndex, endIndex);

  // Function to handle adding a new category
  const handleAddCategory = async (data: { name: string }) => {
    try {
      // Create a new category
      await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setShowAddModal(false);
      fetchCategories(); // Refresh the list of categories
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  // Function to handle updating a category
  const handleUpdateCategory = async (category: ICategory) => {
    try {
      // Update the category with the new name
      const response = await fetch(`${API_BASE_URL}/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      const data = await response.json();
      setCategories(data.categories);
      setShowUpdateModal(false);
      setSelectedCategory(null);
      fetchCategories(); // Refresh the list of categories
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  // Function to handle deleting a category
  const handleDeleteCategory = async (id: string) => {
    try {
      // Delete the category
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setCategories(data.categories);
      setShowDeleteModal(false);
      fetchCategories(); // Refresh the list of categories
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {/* search and add category */}
      <div className="flex items-center space-x-2 mb-4">
        {/* input search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-3 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute right-0 top-0 h-full flex items-center pr-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimesCircle className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowAddModal(true)}
        >
          Add Category
        </button>
      </div>

      {/* Category Table List */}
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Category Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleCategories.length > 0 ? (
            visibleCategories.map((category) => (
              <tr key={category.id}>
                <td className="border px-4 py-2">{category.name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowUpdateModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan={2}>
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4">
        <span className="mr-2">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <AddCategoryModal
          closeModal={() => setShowAddModal(false)}
          handleAddCategory={handleAddCategory}
        />
      )}
      {/* Update Category Modal */}
      {showUpdateModal && (
        <UpdateCategoryModal
          closeModal={() => setShowUpdateModal(false)}
          category={selectedCategory}
          handleUpdateCategory={handleUpdateCategory}
        />
      )}
      {/* Delete Category Modal */}
      {showDeleteModal && (
        <DeleteCategoryModal
          closeModal={() => setShowDeleteModal(false)}
          category={selectedCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      )}
    </div>
  );
}
