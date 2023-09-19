import React from "react";
import { useForm } from "react-hook-form";

interface UpdateProductModalProps {
  closeModal: () => void;
  product: IProduct | null;
  handleProduct: (product: IProduct) => void;
  categories: ICategory[];
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  closeModal,
  product,
  handleProduct,
  categories,
}) => {
  // form  state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({ defaultValues: product || {} });

  // handle submit
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
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Update Product
            </h3>
            <div className="mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* name */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "This field is required",
                    })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                {/* description */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    {...register("description", {
                      required: "This field is required",
                    })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.description ? "border-red-500" : ""
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs italic">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    price
                  </label>
                  <input
                    type="number"
                    {...register("price", {
                      required: "This field is required",
                    })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.price ? "border-red-500" : ""
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs italic">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                {/* image */}
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    image
                  </label>
                  <input
                    type="text"
                    {...register("imageUrl")}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.imageUrl ? "border-red-500" : ""
                    }`}
                  />
                  {errors.imageUrl && (
                    <p className="text-red-500 text-xs italic">
                      {errors.imageUrl.message}
                    </p>
                  )}
                </div>
                {/* stockCount */}
                <div className="mb-4">
                  <label
                    htmlFor="stockCount"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    stockCount
                  </label>
                  <input
                    type="number"
                    {...register("stockCount", {
                      required: "This field is required",
                    })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.stockCount ? "border-red-500" : ""
                    }`}
                  />
                  {errors.stockCount && (
                    <p className="text-red-500 text-xs italic">
                      {errors.stockCount.message}
                    </p>
                  )}
                </div>
                {/* categoryId */}
                <div className="mb-4">
                  <label
                    htmlFor="categoryId"
                    className="block text-gray-700 font-bold mb-2"
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
                    <span className="text-red-500 text-xs italic">
                      {errors.categoryId.message}
                    </span>
                  )}
                </div>

                {/* submit and  Cancel*/}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Update Product
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
