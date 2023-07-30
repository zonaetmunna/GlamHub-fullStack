"use client";
import AddProductModal from "@/app/_components/addProductModal";
import DeleteProductModal from "@/app/_components/deleteProductModal";
import UpdateProductModal from "@/app/_components/updateProductModal";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:3000/api/products";

export default function Product() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []); // Fetch products on component mount

  // Function to fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log("Product retrieval error:", error);
    }
  };

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
      setProducts(data.products);
      setShowAddModal(false);
    } catch (error) {
      console.log("Product creation error:", error);
    }
  };

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowAddModal(true)}
      >
        Add Product
      </button>

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
          {products?.map((product) => (
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

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal
          closeModal={() => setShowAddModal(false)}
          handleProduct={handleAddProduct}
        />
      )}
      {/* Update Product Modal */}
      {showUpdateModal && (
        <UpdateProductModal
          closeModal={() => setShowUpdateModal(false)}
          product={selectedProduct}
          handleProduct={handleUpdateProduct}
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
