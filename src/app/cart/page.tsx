"use client";

import {
  applyDiscountCode,
  clearCart,
  removeFromCart,
  setShippingCost,
  setShippingOption,
  setSubtotal,
  setTotal,
  updateQuantity,
} from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaArrowRight,
  FaGift,
  FaLock,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaTrash,
  FaTruck,
} from "react-icons/fa";

export default function Cart() {
  const { cart, subtotal, total, discountCode, shippingCost, shippingOption } =
    useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [discountInput, setDiscountInput] = useState("");

  // Calculate updated totals when cart changes
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
    dispatch(setSubtotal());
    dispatch(setTotal());
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
    dispatch(setSubtotal());
    dispatch(setTotal());
    toast.success("Item removed from cart");
  };

  const handleApplyDiscount = () => {
    if (discountInput.trim()) {
      dispatch(applyDiscountCode({ discountCode: discountInput.trim() }));
      dispatch(setTotal());

      if (discountInput.trim() === "EXAMPLE10") {
        toast.success("Discount code applied!");
      } else {
        toast.error("Invalid discount code");
      }
    }
  };

  const handleShippingChange = (option: string, cost: number) => {
    dispatch(setShippingOption(option));
    dispatch(setShippingCost(cost));
    dispatch(setTotal());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      cost: 5.99,
      time: "5-7 business days",
    },
    {
      id: "express",
      name: "Express Shipping",
      cost: 12.99,
      time: "2-3 business days",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      cost: 24.99,
      time: "1 business day",
    },
  ];

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-8xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cart.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            🛍️
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.category?.name}
                        </p>
                        <p className="text-lg font-bold text-pink-600 mt-2">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity >= item.stockCount}
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="p-6 bg-gray-50 border-t">
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Clear entire cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Shipping Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <FaTruck className="w-5 h-5 mr-2" />
                  Shipping
                </h3>
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={shippingOption === option.id}
                        onChange={() =>
                          handleShippingChange(option.id, option.cost)
                        }
                        className="text-pink-600 focus:ring-pink-500"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{option.name}</span>
                          <span className="font-bold">${option.cost}</span>
                        </div>
                        <p className="text-sm text-gray-600">{option.time}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <FaGift className="w-5 h-5 mr-2" />
                  Discount Code
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discountCode && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Discount code &quot;{discountCode}&quot; applied
                  </p>
                )}
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                {discountCode === "EXAMPLE10" && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${(subtotal * 0.1).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <FaLock className="w-4 h-4" />
                <span>Secure Checkout</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="w-full mt-3 text-center text-pink-600 hover:text-pink-700 font-medium block"
              >
                Continue Shopping
              </Link>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center">
                  <FaLock className="w-3 h-3 mr-1" />
                  Secure SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
