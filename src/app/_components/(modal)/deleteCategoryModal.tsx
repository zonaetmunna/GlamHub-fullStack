interface DeleteCategoryModalProps {
  closeModal: () => void;
  category: ICategory | null;
  handleDeleteCategory: (id: string) => void;
}
export default function DeleteCategoryModal({
  closeModal,
  category,
  handleDeleteCategory,
}: DeleteCategoryModalProps) {
  const handleDelete = () => {
    if (category && category.id) {
      // Check if category exists and has an id
      handleDeleteCategory(category.id);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Delete Category</h2>
        <p className="mb-4">Are you sure you want to delete this category?</p>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete Category
          </button>
        </div>
      </div>
    </div>
  );
}
