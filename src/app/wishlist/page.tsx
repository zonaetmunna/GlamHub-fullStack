"use client";

import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {
  clearWishlist,
  removeFromWishlist,
} from "@/features/wishlist/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaEye,
  FaHeart,
  FaHeartBroken,
  FaShoppingBag,
  FaStar,
  FaTrash,
} from "react-icons/fa";

export default function Wishlist() {
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart");
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success("Wishlist cleared");
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item.id === productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-8xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Save items you love to your wishlist!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
          >
            <FaShoppingBag className="w-5 h-5" />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FaHeart className="w-8 h-8 text-pink-500 mr-3" />
              My Wishlist
            </h1>
            <p className="text-gray-600 mt-2">{wishlist.length} items saved</p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
            >
              <FaHeartBroken className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden group">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">🛍️</span>
                  </div>
                )}

                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <FaHeart className="w-4 h-4 text-pink-500" />
                </button>

                {/* Featured Badge */}
                {product.isFeatured && (
                  <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}

                {/* Stock Badge */}
                {product.stockCount <= 5 && product.stockCount > 0 && (
                  <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Low Stock
                  </div>
                )}

                {product.stockCount === 0 && (
                  <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.category?.name}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(4.5)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews?.length || 0} reviews)
                    </span>
                  </div>

                  <p className="text-2xl font-bold text-pink-600">
                    ${product.price}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {product.stockCount > 0 ? (
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isInCart(product.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        isInCart(product.id)
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-pink-600 text-white hover:bg-pink-700"
                      }`}
                    >
                      <FaShoppingBag className="w-4 h-4" />
                      {isInCart(product.id) ? "In Cart" : "Add to Cart"}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
                    >
                      <FaShoppingBag className="w-4 h-4" />
                      Out of Stock
                    </button>
                  )}

                  <Link
                    href={`/products/${product.id}`}
                    className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <FaEye className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="p-2 rounded-md border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium"
          >
            <span>Continue Shopping</span>
            <FaShoppingBag className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You might also like
          </h2>
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-4">
              Discover more products you&apos;ll love
            </p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              <span>Explore Products</span>
              <FaShoppingBag className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
