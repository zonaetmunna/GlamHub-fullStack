import { RootState } from "@/features/store";
import { removeFromWishlist } from "@/features/wishlist/wishlistSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
export default function Wishlist() {
  const { wishlist } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900">Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="mt-4 text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white overflow-hidden shadow-sm rounded-lg"
              >
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-gray-500">${product.price}</p>
                </div>
                <div className="px-4 py-3 bg-gray-100">
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
