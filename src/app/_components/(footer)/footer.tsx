export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              scelerisque lectus id nibh posuere fermentum.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-gray-200 transition duration-300 ease-in-out"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-200 transition duration-300 ease-in-out"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-200 transition duration-300 ease-in-out"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p>
              Subscribe to our newsletter to receive updates and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                className="bg-white rounded-l-lg px-4 py-2 focus:outline-none"
                placeholder="Enter your email"
              />
              <button className="bg-white text-gray-800 rounded-r-lg px-4 py-2 hover:bg-gray-200 transition duration-300 ease-in-out">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-300">
            &copy; 2023 Ecommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
