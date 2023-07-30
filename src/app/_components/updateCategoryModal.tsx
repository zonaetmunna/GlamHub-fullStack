import { useForm } from "react-hook-form";

interface UpdateCategoryModalProps {
  closeModal: () => void;
  category: ICategory | null;
  handleUpdateCategory: (data: ICategory) => void;
}
export default function UpdateCategoryModal({
  closeModal,
  category,
  handleUpdateCategory,
}: UpdateCategoryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>();
  const onSubmit = (data: ICategory) => {
    handleUpdateCategory(data);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Update Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Category Name"
            className="border rounded p-2 mb-2 w-full"
            {...register("name", { required: "Category name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
