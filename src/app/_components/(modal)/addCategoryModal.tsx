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
  // state
  const [isSuccess, setIsSuccess] = useState(false);

  // handle submit
  const onSubmit = async (data: ICategory) => {
    try {
      await handleAddCategory(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
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
              Add Category
            </h3>
            {isSuccess ? (
              <div className="text-green-500 text-sm mb-4">
                Category added successfully!
              </div>
            ) : (
              // form
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  placeholder="Category Name"
                  className="border rounded p-2 mb-2 w-full"
                  {...register("name", {
                    required: "Category name is required",
                  })}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
                {/* submit and cancel */}
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
                      isSubmitting
                        ? "bg-gray-500"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white font-bold py-2 px-4 rounded`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add Category"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
