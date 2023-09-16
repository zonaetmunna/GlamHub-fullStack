"use client";
import AddCategoryModal from "@/app/_components/(modal)/addCategoryModal";
import DeleteCategoryModal from "@/app/_components/deleteCategoryModal";
import UpdateCategoryModal from "@/app/_components/updateCategoryModal";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:3000/api/categories";

export default function Category() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

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
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowAddModal(true)}
      >
        Add Category
      </button>

      {/* Category Table List */}
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Category Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
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
