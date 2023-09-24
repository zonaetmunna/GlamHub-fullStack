// import
import { RootState } from "@/features/store";
import Link from "next/link";
import { useState } from "react";
import { BsCart3, BsHeart } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
export default function Navbar() {
  // state for show/hide links
  const [showLinks, setShowLinks] = useState(false);

  // user from redux
  // const { user } = useSelector((state: RootState) => state.auth);
  const user = {
    email: "zonaetmonna@gmail.com",
    role: "admin",
  };
  const dispatch = useDispatch();
  console.log(user);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);

  const handleButtonClick = () => {
    setShowLinks(!showLinks); // Toggle the visibility of links
  };

  const handleLogOut = () => {
    // dispatch(logOut());
  };
  return (
    <div className="py-3 px-3 bg-stone-50 border-b border-white-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* future modify */}
            {/* <Link href="/">
              <img src={logo} alt="" className="h-8 w-auto" />
            </Link> */}
            {/* ignore this future */}
            <h3 className="font-bold text-xl ml-2">GlamHUb</h3>
          </div>
          {/* Search Input and Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/shop" className="mx-2 font-bold text-yellow-500">
              Shop
            </Link>
            <Link href="/products" className="mx-2 font-bold text-yellow-500">
              Products
            </Link>
            <Link href="/offer" className="mx-2 font-bold text-yellow-500">
              Offer
            </Link>
            <Link href="/faq" className="mx-2 font-bold text-yellow-500">
              Faq
            </Link>
            <Link href="/contact" className="mx-2 font-bold text-yellow-500">
              Contact
            </Link>
          </div>
          {/* User Actions */}
          <div className="flex justify-around items-center">
            <Link href="/wishlist" className="mx-2">
              <div className="relative">
                <BsHeart size={20} className="text-yellow-500" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/cart" className="mx-2">
              <div className="relative">
                <BsCart3 size={20} className="text-yellow-500" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>
            {user?.role === "admin" && (
              <Link href="/dashboard" className="mx-2">
                Admin Dashboard
              </Link>
            )}

            {user?.role === "seller" && (
              <Link href="/dashboard" className="mx-2">
                Seller Dashboard
              </Link>
            )}

            {user?.role === "user" && (
              <div className="relative">
                <button
                  onClick={handleButtonClick}
                  className="mx-2 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <VscAccount size={20} />
                  {showLinks && (
                    <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Settings
                      </Link>
                      <button
                        className="block px-4 py-2 text-gray-600 hover:text-gray-800"
                        onClick={handleLogOut}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </button>
              </div>
            )}

            {!user?.email && (
              <Link href="/login" className="mx-2">
                Login
              </Link>
            )}

            {(!user || (user.role !== "admin" && user.role !== "seller")) && (
              <Link
                href="/seller-registration"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Become a Seller
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
