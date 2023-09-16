import { useState } from "react";
import { useForm } from "react-hook-form";

interface AddCategoryModalProps {
  closeModal: () => void;
  handleAddCategory: (data: ICategory) => void;
}

export default function AddCategoryModal({
  closeModal,
  handleAddCategory,
}: AddCategoryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ICategory>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: ICategory) => {
    try {
      await handleAddCategory(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
      {isSuccess ? (
        <div className="text-green-500 text-sm mb-4">
          Category added successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Category Name"
            className="border rounded p-2 mb-2 w-full"
            {...register("name", { required: "Category name is required" })}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              } text-white font-bold py-2 px-4 rounded`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
