"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiMessageSquare } from "react-icons/bi";
import {
  FaChevronDown,
  FaChevronUp,
  FaCog,
  FaFilePdf,
  FaList,
  FaPlus,
  FaUser,
} from "react-icons/fa";
import {
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiShoppingBag,
} from "react-icons/fi";
import { MdPeople, MdPerson } from "react-icons/md";

export default function DashboardSidebar() {
  // modify letter
  /* const {
    user: { role },
  } = useSelector((state) => state.auth); */
  const user = {
    role: "admin",
    email: "zonaetmonna@gmail.com",
  };
  const role = user.role;

  // hooks routing
  const router = useRouter();

  // state collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);
  // state
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isVendorOpen, setIsVendorOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  // handle toggle collapsed
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // handle toggle menu
  const toggleProductMenu = () => {
    setIsProductOpen(!isProductOpen);
  };
  const toggleCategoriesMenu = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  const toggleBrandsMenu = () => {
    setIsBrandsOpen(!isBrandsOpen);
  };
  const toggleVendorMenu = () => {
    setIsVendorOpen(!isVendorOpen);
  };
  const toggleCustomerMenu = () => {
    setIsCustomerOpen(!isCustomerOpen);
  };
  const toggleOrderMenu = () => {
    setIsOrderOpen(!isOrderOpen);
  };
  const toggleBlogMenu = () => {
    setIsBlogOpen(!isBlogOpen);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16 " : "w-56 "
      }  top-0 left-0 h-screen bg-gray-800 text-gray-100 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {role === "admin" && (
        <nav className="flex flex-col py-4 ">
          {/* products */}
          <button
            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded-md  transition-colors duration-200"
            onClick={toggleProductMenu}
          >
            <span className="mr-2">
              <FaList />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Products</span>
            {isProductOpen ? (
              <FaChevronUp
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            ) : (
              <FaChevronDown
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            )}
          </button>
          <div className={`ml-4 ${isProductOpen ? "" : "hidden"}`}>
            <Link
              href="/dashboard/product"
              className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <span className="mr-2">
                <FaList />
              </span>
              <span className={`${isCollapsed ? "hidden" : ""}`}>Product</span>
            </Link>
            <Link
              href="product-add"
              className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-300 rounded-md"
            >
              <span className="mr-2">
                <FaPlus />
              </span>
              <span className={`${isCollapsed ? "hidden" : ""}`}>
                Add Product
              </span>
            </Link>
          </div>
          {/* category */}
          <button
            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded-md  transition-colors duration-200"
            onClick={toggleCategoriesMenu}
          >
            <span className="mr-2">
              <FaList />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Categories</span>
            {isCategoriesOpen ? (
              <FaChevronUp
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            ) : (
              <FaChevronDown
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            )}
          </button>
          <div className={`ml-4 ${isCategoriesOpen ? "" : "hidden"}`}>
            <Link
              href="/dashboard/category"
              className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <span className="mr-2">
                <FaList />
              </span>
              <span className={`${isCollapsed ? "hidden" : ""}`}>Category</span>
            </Link>
          </div>
          {/* brand */}
          <button
            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded-md  transition-colors duration-200"
            onClick={toggleBrandsMenu}
          >
            <span className="mr-2">
              <FaList />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Brand</span>
            {isBrandsOpen ? (
              <FaChevronUp
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            ) : (
              <FaChevronDown
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            )}
          </button>
          <div className={`ml-4 ${isBrandsOpen ? "" : "hidden"}`}>
            <Link
              href="/dashboard/brand"
              className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <span className="mr-2">
                <FaList />
              </span>
              <span className={`${isCollapsed ? "hidden" : ""}`}>
                Brand List
              </span>
            </Link>
          </div>

          {/* vendors */}
          <button
            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded-md"
            onClick={toggleVendorMenu}
          >
            <span className="mr-2">
              <FaUser />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Vendors</span>
            {isVendorOpen ? (
              <FaChevronUp
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            ) : (
              <FaChevronDown
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            )}
          </button>
          <div className={`ml-4 ${isVendorOpen ? "" : "hidden"}`}>
            <Link
              href="vendor-list"
              className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-300 rounded-md"
            >
              <span className="mr-2">
                <FaUser />
              </span>
              <span className={`${isCollapsed ? "hidden" : ""}`}>
                Vendors List
              </span>
            </Link>
          </div>

          {/* customer */}
          <button
            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded-md"
            onClick={toggleCustomerMenu}
          >
            <span className="mr-2">
              <MdPerson />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Customer</span>
            {isCustomerOpen ? (
              <FaChevronUp
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            ) : (
              <FaChevronDown
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            )}
          </button>
          <div className={`ml-4 ${isCustomerOpen ? "" : "hidden"}`}>
            <Link
              href="customer-list"
              className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-300 rounded-md"
            >
              <span className="mr-2">
                <MdPeople />
              </span>
              <span className={`${isCollapsed ? "hidden" : ""}`}>
                Customer List
              </span>
            </Link>
          </div>
          {/* orders */}
          <button
            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded-md"
            onClick={toggleOrderMenu}
          >
            <span className="mr-2">
              <FiShoppingBag className="mr-4" />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Orders</span>
            {isOrderOpen ? (
              <FaChevronUp
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            ) : (
              <FaChevronDown
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            )}
          </button>
          <div className={`ml-4 ${isOrderOpen ? "" : "hidden"}`}>
            <Link
              href="order-list"
              className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-300 rounded-md"
            >
              <span className="mr-2">
                <FiShoppingBag />
              </span>
              <span className={`${isCollapsed ? "hidden" : ""}`}>
                Order List
              </span>
            </Link>
          </div>
          {/* blog */}
          <button
            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded-md  transition-colors duration-200"
            onClick={toggleBlogMenu}
          >
            <span className="mr-2">
              <FaList />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Blogs</span>
            {isProductOpen ? (
              <FaChevronUp
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            ) : (
              <FaChevronDown
                className={`ml-auto ${isCollapsed ? "hidden" : ""}`}
              />
            )}
          </button>
          <div className={`ml-4 ${isBlogOpen ? "" : "hidden"}`}>
            <Link
              href="/dashboard/blog"
              className="flex items-center py-2 px-4 text-gray-100 hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <span className="mr-2">
                <FaList />
              </span>
              <span className={`${isCollapsed ? "hidden" : ""}`}>Blogs</span>
            </Link>
          </div>

          {/* invoice */}
          <button
            onClick={() => router.push("/dashboard/invoice")}
            className="flex items-center py-2 px-4  hover:bg-gray-700 rounded-md"
          >
            <span className="mr-2">
              <FaFilePdf className="mr-4" />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Invoice</span>
          </button>
          {/* setting */}
          <button
            onClick={() => router.push("/dashboard/setting")}
            className="flex items-center py-2 px-4  hover:bg-gray-700 rounded-md"
          >
            <span className="mr-2">
              <FaCog className="mr-4" />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Setting</span>
          </button>
          {/* messages */}
          <button
            onClick={() => router.push("/dashboard/message")}
            className="flex items-center py-2 px-4  hover:bg-gray-700 rounded-md"
          >
            <span className="mr-2">
              <BiMessageSquare className="mr-4" />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Message</span>
          </button>
          <button
            onClick={() => router.push("/dashboard/make-admin")}
            className="flex items-center py-2 px-4  hover:bg-gray-700 rounded-md"
          >
            <span className="mr-2">
              <BiMessageSquare className="mr-4" />
            </span>
            <span className={`${isCollapsed ? "hidden" : ""}`}>Make-Admin</span>
          </button>
        </nav>
      )}
      {/* logout */}
      <div className="flex items-center justify-center">
        <button className="flex items-center py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-700 transition-colors duration-200">
          <span className="mr-2">
            <FiLogOut className="mr-4" />
          </span>
          <span className={`${isCollapsed ? "hidden" : ""}`}>Logout</span>
        </button>
      </div>
      <div
        className="absolute bottom-0 mb-6 mx-auto cursor-pointer"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <FiChevronRight className="text-gray-500 text-2xl" />
        ) : (
          <FiChevronLeft className="text-gray-500 text-2xl" />
        )}
      </div>
    </div>
  );
}
