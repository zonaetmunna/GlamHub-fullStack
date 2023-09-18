import {
  applyDiscountCode,
  clearCart,
  removeFromCart,
  setSubtotal,
  setTotal,
  updateQuantity,
} from "@/features/cart/cartSlice";
import { AppDispatch, RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";
export default function Cart() {
  const { cart, subtotal, total, discountCode } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();

  // Function to handle applying a discount code
  const handleApplyDiscount = () => {
    // Dispatch the action to apply a discount code
    dispatch(applyDiscountCode({ discountCode: "EXAMPLE10" }));

    // Recalculate subtotal and total
    dispatch(setSubtotal());
    dispatch(setTotal());
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* Render cart items here */}
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: parseInt(e.target.value),
                          })
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-2">${item.price * item.quantity}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Discount: {discountCode === "EXAMPLE10" ? "10%" : "0%"}</p>
            <p>Total: ${total}</p>
            <button
              onClick={handleApplyDiscount}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Apply Discount Code
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
