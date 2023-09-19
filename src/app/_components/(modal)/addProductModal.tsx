import React from "react";
import { useForm } from "react-hook-form";

interface AddProductModalProps {
  closeModal: () => void;
  handleProduct: (product: IProduct) => void;
  categories: ICategory[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  closeModal,
  handleProduct,
  categories,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  const onSubmit = (data: IProduct) => {
    data.price = Number(data.price);
    data.stockCount = Number(data.stockCount);
    handleProduct(data);
    console.log(data);
    closeModal();
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* heading */}
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Add Product
            </h3>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`block w-full mt-1 p-2 border rounded ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              {/* description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={`block w-full mt-1 p-2 border rounded ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
              {/* price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  className={`block w-full mt-1 p-2 border rounded ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">
                    {errors.price.message}
                  </span>
                )}
              </div>
              {/* imageUrl */}
              <div className="mb-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image url
                </label>
                <input
                  type="text"
                  {...register("imageUrl", {
                    required: "imageUrl is required",
                  })}
                  className={`block w-full mt-1 p-2 border rounded ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.imageUrl && (
                  <span className="text-red-500 text-sm">
                    {errors.imageUrl.message}
                  </span>
                )}
              </div>
              {/* stockCount */}
              <div className="mb-4">
                <label
                  htmlFor="stockCount"
                  className="block text-sm font-medium text-gray-700"
                >
                  stockCount
                </label>
                <input
                  type="number"
                  {...register("stockCount", {
                    required: "stockCount is required",
                  })}
                  className={`block w-full mt-1 p-2 border rounded ${
                    errors.stockCount ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.stockCount && (
                  <span className="text-red-500 text-sm">
                    {errors.stockCount.message}
                  </span>
                )}
              </div>
              {/* category */}
              <div className="mb-4">
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  {...register("categoryId", {
                    required: "Category is required",
                  })}
                  className={`block w-full mt-1 p-2 border rounded ${
                    errors.categoryId ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <span className="text-red-500 text-sm">
                    {errors.categoryId.message}
                  </span>
                )}
              </div>
              {/* submit and cancel */}
              <div className="flex justify-between">
                {/* submit */}
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Add Product
                </button>
                {/* cancel */}
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
