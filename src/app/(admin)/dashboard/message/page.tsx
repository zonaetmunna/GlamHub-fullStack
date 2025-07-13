"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaFilter,
  FaPlus,
  FaReply,
  FaSearch,
  FaStar,
  FaTrash,
} from "react-icons/fa";

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const messages = [
    {
      id: 1,
      from: "John Doe",
      email: "john@example.com",
      subject: "Question about product availability",
      preview:
        "Hi, I was wondering if the luxury face cream is back in stock...",
      timestamp: "2 hours ago",
      read: false,
      starred: false,
      type: "customer_inquiry",
    },
    {
      id: 2,
      from: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Appointment cancellation request",
      preview: "I need to cancel my appointment scheduled for tomorrow...",
      timestamp: "5 hours ago",
      read: true,
      starred: true,
      type: "appointment",
    },
    {
      id: 3,
      from: "Mike Wilson",
      email: "mike@example.com",
      subject: "Order status inquiry",
      preview: "Could you please update me on the status of my recent order...",
      timestamp: "1 day ago",
      read: false,
      starred: false,
      type: "order_inquiry",
    },
    {
      id: 4,
      from: "Emma Brown",
      email: "emma@example.com",
      subject: "Service feedback",
      preview: "I wanted to share my experience with your facial treatment...",
      timestamp: "2 days ago",
      read: true,
      starred: false,
      type: "feedback",
    },
    {
      id: 5,
      from: "David Lee",
      email: "david@example.com",
      subject: "Bulk order inquiry",
      preview: "I'm interested in placing a bulk order for my salon...",
      timestamp: "3 days ago",
      read: false,
      starred: true,
      type: "business_inquiry",
    },
  ];

  const tabs = [
    {
      id: "inbox",
      label: "Inbox",
      count: messages.filter((m) => !m.read).length,
    },
    { id: "sent", label: "Sent", count: 0 },
    {
      id: "starred",
      label: "Starred",
      count: messages.filter((m) => m.starred).length,
    },
    { id: "trash", label: "Trash", count: 0 },
  ];

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "customer_inquiry":
        return "bg-blue-500/20 text-blue-400";
      case "appointment":
        return "bg-green-500/20 text-green-400";
      case "order_inquiry":
        return "bg-yellow-500/20 text-yellow-400";
      case "feedback":
        return "bg-purple-500/20 text-purple-400";
      case "business_inquiry":
        return "bg-pink-500/20 text-pink-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case "customer_inquiry":
        return "Customer Inquiry";
      case "appointment":
        return "Appointment";
      case "order_inquiry":
        return "Order Inquiry";
      case "feedback":
        return "Feedback";
      case "business_inquiry":
        return "Business Inquiry";
      default:
        return "General";
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-gray-400">
            Manage customer communications and inquiries
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors mt-4 sm:mt-0">
          <FaPlus className="w-4 h-4" />
          <span>Compose</span>
        </button>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Tabs */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-pink-500/20 text-pink-400"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="capitalize">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Filters */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <h3 className="text-white font-medium mb-3">Quick Filters</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-gray-400 hover:text-white py-1 text-sm">
                Unread Messages
              </button>
              <button className="w-full text-left text-gray-400 hover:text-white py-1 text-sm">
                Urgent Messages
              </button>
              <button className="w-full text-left text-gray-400 hover:text-white py-1 text-sm">
                This Week
              </button>
            </div>
          </div>
        </div>

        {/* Message List */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-medium">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-white">
                    <FaFilter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/10 ${
                    selectedMessage?.id === message.id
                      ? "bg-pink-500/20"
                      : !message.read
                      ? "bg-white/5"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {message.from.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className={`text-sm font-medium truncate ${
                            message.read ? "text-gray-300" : "text-white"
                          }`}
                        >
                          {message.from}
                        </p>
                        <div className="flex items-center space-x-2">
                          {message.starred && (
                            <FaStar className="w-3 h-3 text-yellow-400" />
                          )}
                          {!message.read && (
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p
                        className={`text-sm truncate mb-1 ${
                          message.read ? "text-gray-400" : "text-gray-300"
                        }`}
                      >
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {message.preview}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getMessageTypeColor(
                            message.type
                          )}`}
                        >
                          {getMessageTypeLabel(message.type)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            {selectedMessage ? (
              <div className="h-full">
                {/* Message Header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {selectedMessage.from.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {selectedMessage.from}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {selectedMessage.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <FaStar className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h2 className="text-white font-medium mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getMessageTypeColor(
                        selectedMessage.type
                      )}`}
                    >
                      {getMessageTypeLabel(selectedMessage.type)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {selectedMessage.timestamp}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-4 flex-1">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300">{selectedMessage.preview}</p>
                    <p className="text-gray-300 mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-gray-300 mt-4">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </div>

                {/* Reply Section */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center space-x-3">
                    <button className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2">
                      <FaReply className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                    <button className="bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors">
                      Forward
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <FaEnvelope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Select a message to view its content
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
