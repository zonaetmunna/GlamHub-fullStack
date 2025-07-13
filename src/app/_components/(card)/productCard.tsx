"use client";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { addToWishlist } from "@/features/wishlist/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiHeart, BiShoppingBag } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

type ProductCardProps = {
  product: IProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const cart = useAppSelector((state) => state.cart.cart);
  const wishlist = useAppSelector((state) => state.wishlist.wishlist);

  const isInCart = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Product added to cart", {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    toast.success("Product added to wishlist", {
      icon: "❤️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  // Calculate average rating
  const averageRating = product.reviews?.length
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length
    : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>
        {i < Math.floor(rating) ? (
          <AiFillStar className="text-yellow-400" />
        ) : (
          <AiOutlineStar className="text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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

        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}

        {/* Stock Badge */}
        {product.stockCount <= 5 && product.stockCount > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Low Stock
          </div>
        )}

        {product.stockCount === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
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
          <p className="text-sm text-gray-600 mb-2">{product.category?.name}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">{renderStars(averageRating)}</div>
            <span className="text-sm text-gray-500">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="text-2xl font-bold text-pink-600">${product.price}</p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center mb-4">
          <button
            type="button"
            className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <RiArrowDropDownLine className="text-gray-500" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-16 text-center py-1 border-t border-b border-gray-300 focus:outline-none"
            min={1}
            max={product.stockCount}
          />
          <button
            type="button"
            className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none"
            onClick={handleIncrement}
            disabled={quantity >= product.stockCount}
          >
            <RiArrowDropUpLine className="text-gray-500" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stockCount === 0}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              product.stockCount === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isInCart
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-pink-600 text-white hover:bg-pink-700"
            }`}
          >
            <BiShoppingBag className="w-4 h-4" />
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>

          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-md border transition-colors ${
              isInWishlist
                ? "bg-red-100 text-red-600 border-red-300"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <BiHeart className="w-4 h-4" />
          </button>

          <Link
            href={`/products/${product.id}`}
            className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <BsEye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
