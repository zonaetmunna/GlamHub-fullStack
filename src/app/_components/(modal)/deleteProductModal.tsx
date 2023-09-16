import React from "react";

interface DeleteProductModalProps {
  closeModal: () => void;
  product: IProduct | null;
  handleDeleteProduct: (productId: string) => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  closeModal,
  product,
  handleDeleteProduct,
}) => {
  const handleDelete = () => {
    if (product && product.id) {
      // Check if product exists and has an id
      handleDeleteProduct(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
      {product && (
        <div>
          <p className="mb-4">
            Are you sure you want to delete the product {product.name}?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Confirm Delete
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProductModal;
