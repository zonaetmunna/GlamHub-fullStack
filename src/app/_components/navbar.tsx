import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <p className="text-white text-xl font-bold">Ecommerce</p>
            </Link>
          </div>
          <div className="flex">
            <Link href="/products">
              <p className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </p>
            </Link>
            <Link href="/cart">
              <p className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Cart
              </p>
            </Link>
            <Link href="/login">
              <p className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
