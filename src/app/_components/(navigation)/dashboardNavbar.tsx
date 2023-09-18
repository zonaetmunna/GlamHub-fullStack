"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMessageSquare } from "react-icons/bi";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { FiMaximize, FiMinimize, FiMoon, FiSun } from "react-icons/fi";
import { useDispatch } from "react-redux";

export default function DashboardNavbar() {
  const [isFullscreen, setIsFullscreen] = useState<true | false>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState<true | false>(false);
  const [showNotifications, setShowNotifications] = useState<true | false>(
    false
  );
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New order received",
      time: "10 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      message: "Product out of stock",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: 3,
      message: "New message from customer",
      time: "2 hours ago",
      isRead: false,
    },
  ]);

  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alice",
      content: "Hey, how are you?",
    },
    {
      id: 2,
      sender: "Bob",
      content: "I am doing well. Thanks for asking!",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // hooks
  const dispatch = useDispatch();
  // modfiy future with real data
  const user = {
    role: "admin",
    email: "zonaetmonna@gmail.com",
  };
  const email = user.email;
  const role = user.role;

  // message submit textarea field handle
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = messages.length + 1;
    const sender = "Me";
    const content = newMessage.trim();
    if (content) {
      setMessages([...messages, { id, sender, content }]);
      setNewMessage("");
    }
  };
  const iconVariants = {
    open: {
      rotate: 90,
      transition: { duration: 0.2 },
    },
    closed: {
      rotate: 0,
      transition: { duration: 0.2 },
    },
  };

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const markAsRead = (id: number) => {
    setNotifications((prevState) =>
      prevState.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };
  useEffect(() => {
    // Convert isDarkMode to a string before saving to localStorage
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    // Retrieve the value from localStorage and parse it back to a boolean
    const storedValue = localStorage.getItem("isDarkMode");
    if (storedValue === "true") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleSignOUt = () => {
    // dispatch(logout());
  };

  return (
    <nav
      className={`px-2 py-3 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* dashboard logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              {/* modify future */}
              {/* <Image
                className="h-8 w-auto rounded-full"
                src={brandLogo}
                alt="Workflow"
              /> */}
              <span className="font-semibold text-xl ml-2">Dashboard</span>
            </Link>
          </div>
          {/*  */}
          <div className="flex justify-around items-center">
            {/* dark mode */}
            <div>
              <button className="mr-2" onClick={handleModeToggle}>
                {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
              </button>
            </div>
            {/* full screen */}
            <div className="flex items-center">
              <button
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-500"
                onClick={handleFullscreen}
              >
                {isFullscreen ? (
                  <FiMinimize className="h-6 w-6" />
                ) : (
                  <FiMaximize className="h-6 w-6" />
                )}
              </button>
            </div>
            {/* message */}
            <div className="relative pl-3">
              <div className="relative">
                <motion.button
                  className=" hover:text-gray-300 "
                  onClick={() => setShowMessages(!showMessages)}
                  variants={iconVariants}
                  animate={showMessages ? "open" : "closed"}
                >
                  <BiMessageSquare className="w-6 h-6" />
                </motion.button>
                {showMessages && (
                  <div className="absolute right-0 w-64 bg-white shadow-lg rounded-lg mt-2">
                    <div className="p-4">
                      <h2 className="font-bold text-lg mb-2">Messages</h2>
                      <ul>
                        {messages.map((message) => (
                          <li key={message.id} className="mb-2">
                            <p className="text-gray-700 font-medium">
                              {message.sender}
                            </p>
                            <p className="text-gray-600">{message.content}</p>
                          </li>
                        ))}
                      </ul>
                      <form onSubmit={handleSubmit} className="mt-4">
                        <textarea
                          className="w-full border rounded py-2 px-3 mb-2"
                          placeholder="Type your message here"
                          value={newMessage}
                          onChange={handleChange}
                        />
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* notification */}
            <div className="relative pl-3">
              <button
                className=" p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                onClick={handleNotifications}
              >
                <FaBell className="w-6 h-6" />
              </button>
              <div
                className={`${
                  showNotifications ? "block" : "hidden"
                } origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div className="py-1" role="none">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href="#"
                      className={`${
                        notification.isRead ? "text-gray-500" : "text-gray-900"
                      } block px-4 py-2 text-sm`}
                      role="menuitem"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-400">
                          {notification.time}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* user */}
            {email && (
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={handleUserDropdown}
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <FaUserCircle className="h-8 w-8 rounded-full text-gray-400" />
                  </button>
                </div>
                {showUserDropdown && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <p>{email}</p>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <Link
                      onClick={handleSignOUt}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
