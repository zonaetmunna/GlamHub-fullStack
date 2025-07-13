"use client";
// import
import AddProductModal from "@/app/_components/(modal)/addProductModal";
import DeleteProductModal from "@/app/_components/(modal)/deleteProductModal";
import UpdateProductModal from "@/app/_components/(modal)/updateProductModal";
import { useEffect, useMemo, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Select from "react-select";

// api for product, category
const API_BASE_URL = "http://localhost:3000/api/products";
const API_BASE_URL_CATEGORIES = "http://localhost:3000/api/categories";

export interface CategoryOption {
  label: string;
  value: string;
}

export default function Product() {
  // sate for products and categories
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]); // State to store categories
  // state for modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // state for selected product and category search and pagination
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption | null>(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // useEffect to fetch products and categories
  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Load categories when the component mounts
  }, []); // Fetch products on component mount

  // Function to fetch all products
  const fetchProducts = async () => {
    const apiUrl =
      API_BASE_URL +
      (selectedCategory ? `?category=${selectedCategory.value}` : "");
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log("Product retrieval error:", error);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await fetch(API_BASE_URL_CATEGORIES);
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.log("Category retrieval error:", error);
    }
  };

  // handle add product
  const handleAddProduct = async (product: IProduct) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
      setShowAddModal(false);
    } catch (error) {
      console.log("Product creation error:", error);
    }
  };

  // handle update product
  const handleUpdateProduct = async (product: IProduct) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      console.log(data);
      setProducts(data.products);
      setShowUpdateModal(false);
    } catch (error) {
      console.log("Product update error:", error);
    }
  };

  // Function to handle deleting a product
  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setProducts(data.products);
      setShowDeleteModal(false);
    } catch (error) {
      console.log("Product deletion error:", error);
    }
  };

  // Filter products by selected category, search text, and pagination
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.Category.name === selectedCategory.value
      );
    }

    // Filter by search text
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(lowerSearchText)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchText]);

  const categoryOptions = categories?.map((category: ICategory) => ({
    label: category.name,
    value: category.name,
  }));

  const handleCategoryChange = (selected: CategoryOption | null) => {
    setSelectedCategory(selected);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {/* category, search, and add product buttons */}
      <div className="flex items-center space-x-2 mb-4">
        {/* select category  */}
        <div className="relative">
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-40"
          />
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute right-0 top-0 h-full flex items-center pr-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimesCircle className="w-4 h-4" />
            </button>
          )}
        </div>
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
        <div className="  flex items-center ">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowAddModal(true)}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product Table List */}
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleProducts.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowUpdateModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
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

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal
          closeModal={() => setShowAddModal(false)}
          handleProduct={handleAddProduct}
          categories={categories} // Pass categories as a prop
        />
      )}
      {/* Update Product Modal */}
      {showUpdateModal && (
        <UpdateProductModal
          closeModal={() => setShowUpdateModal(false)}
          product={selectedProduct}
          handleProduct={handleUpdateProduct}
          categories={categories}
        />
      )}
      {/* Delete Product Modal */}
      {showDeleteModal && (
        <DeleteProductModal
          closeModal={() => setShowDeleteModal(false)}
          product={selectedProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
}
