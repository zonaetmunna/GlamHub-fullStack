import React from "react";
import { Controller, useForm } from "react-hook-form";

interface UpdateProductModalProps {
  closeModal: () => void;
  product: IProduct | null;
  handleProduct: (product: IProduct) => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  closeModal,
  product,
  handleProduct,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({ defaultValues: product || {} });

  const onSubmit = (data: IProduct) => {
    handleProduct(data);
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 px-4 py-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
            rules={{ required: "Name is required" }}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 px-4 py-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
            rules={{ required: "Description is required" }}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="mt-1 px-4 py-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
            rules={{
              required: "Price is required",
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: "Invalid price format",
              },
            }}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>
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
  );
};

export default UpdateProductModal;
