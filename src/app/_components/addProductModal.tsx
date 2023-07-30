import React from "react";
import { useForm } from "react-hook-form";

interface AddProductModalProps {
  closeModal: () => void;
  handleProduct: (product: IProduct) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  closeModal,
  handleProduct,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  const onSubmit = (data: IProduct) => {
    handleProduct(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`form-input ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              {...register("description", {
                required: "Description is required",
              })}
              className={`form-input ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
              })}
              className={`form-input ${errors.price ? "border-red-500" : ""}`}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
          <div className="buttons-container">
            <button type="submit" className="btn-add">
              Add Product
            </button>
            <button type="button" className="btn-cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
