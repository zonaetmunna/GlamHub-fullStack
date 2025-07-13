"use client";

import { useState } from "react";
import {
  FaBell,
  FaCog,
  FaCreditCard,
  FaDatabase,
  FaEnvelope,
  FaPalette,
  FaSave,
  FaShieldAlt,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "GlamHub",
    siteDescription: "Premium Beauty & Wellness Platform",
    siteUrl: "https://glamhub.com",
    adminEmail: "admin@glamhub.com",
    supportEmail: "support@glamhub.com",
    allowRegistration: true,
    emailVerification: true,
    maintenanceMode: false,
    darkMode: true,
    enableNotifications: true,
    enableSMS: false,
    currency: "USD",
    timezone: "America/New_York",
    language: "en",
    maxUploadSize: "5MB",
    sessionTimeout: 30,
    twoFactorAuth: false,
    googleAnalytics: "",
    facebookPixel: "",
    stripePublishableKey: "",
    stripeSecretKey: "",
    paypalClientId: "",
    smtpHost: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    smtpEncryption: "tls",
  });

  const tabs = [
    { id: "general", label: "General", icon: FaCog },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "email", label: "Email", icon: FaEnvelope },
    { id: "payments", label: "Payments", icon: FaCreditCard },
    { id: "appearance", label: "Appearance", icon: FaPalette },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "system", label: "System", icon: FaDatabase },
  ];

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    handleInputChange("siteName", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Site URL
                </label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => handleInputChange("siteUrl", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  handleInputChange("siteDescription", e.target.value)
                }
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) =>
                    handleInputChange("adminEmail", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    handleInputChange("supportEmail", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) =>
                    handleInputChange("currency", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    handleInputChange("timezone", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Allow Registration
                    </h3>
                    <p className="text-sm text-gray-400">
                      Allow new users to register accounts
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleInputChange(
                        "allowRegistration",
                        !settings.allowRegistration
                      )
                    }
                    className="text-2xl text-pink-400 hover:text-pink-300"
                  >
                    {settings.allowRegistration ? (
                      <FaToggleOn />
                    ) : (
                      <FaToggleOff />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Email Verification
                    </h3>
                    <p className="text-sm text-gray-400">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleInputChange(
                        "emailVerification",
                        !settings.emailVerification
                      )
                    }
                    className="text-2xl text-pink-400 hover:text-pink-300"
                  >
                    {settings.emailVerification ? (
                      <FaToggleOn />
                    ) : (
                      <FaToggleOff />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-400">
                      Enable 2FA for admin accounts
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleInputChange(
                        "twoFactorAuth",
                        !settings.twoFactorAuth
                      )
                    }
                    className="text-2xl text-pink-400 hover:text-pink-300"
                  >
                    {settings.twoFactorAuth ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      handleInputChange("sessionTimeout", e.target.value)
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Upload Size
                  </label>
                  <select
                    value={settings.maxUploadSize}
                    onChange={(e) =>
                      handleInputChange("maxUploadSize", e.target.value)
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="1MB">1MB</option>
                    <option value="5MB">5MB</option>
                    <option value="10MB">10MB</option>
                    <option value="25MB">25MB</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={settings.smtpHost}
                  onChange={(e) =>
                    handleInputChange("smtpHost", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  SMTP Port
                </label>
                <input
                  type="text"
                  value={settings.smtpPort}
                  onChange={(e) =>
                    handleInputChange("smtpPort", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  SMTP Username
                </label>
                <input
                  type="text"
                  value={settings.smtpUsername}
                  onChange={(e) =>
                    handleInputChange("smtpUsername", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  SMTP Password
                </label>
                <input
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) =>
                    handleInputChange("smtpPassword", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                SMTP Encryption
              </label>
              <select
                value={settings.smtpEncryption}
                onChange={(e) =>
                  handleInputChange("smtpEncryption", e.target.value)
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        );

      case "payments":
        return (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">
                Stripe Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Publishable Key
                  </label>
                  <input
                    type="text"
                    value={settings.stripePublishableKey}
                    onChange={(e) =>
                      handleInputChange("stripePublishableKey", e.target.value)
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Secret Key
                  </label>
                  <input
                    type="password"
                    value={settings.stripeSecretKey}
                    onChange={(e) =>
                      handleInputChange("stripeSecretKey", e.target.value)
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">
                PayPal Configuration
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Client ID
                </label>
                <input
                  type="text"
                  value={settings.paypalClientId}
                  onChange={(e) =>
                    handleInputChange("paypalClientId", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Dark Mode</h3>
                <p className="text-sm text-gray-400">
                  Enable dark theme for admin panel
                </p>
              </div>
              <button
                onClick={() =>
                  handleInputChange("darkMode", !settings.darkMode)
                }
                className="text-2xl text-pink-400 hover:text-pink-300"
              >
                {settings.darkMode ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={settings.googleAnalytics}
                  onChange={(e) =>
                    handleInputChange("googleAnalytics", e.target.value)
                  }
                  placeholder="GA-XXXXX-X"
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.facebookPixel}
                  onChange={(e) =>
                    handleInputChange("facebookPixel", e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-400">
                  Send email notifications for important events
                </p>
              </div>
              <button
                onClick={() =>
                  handleInputChange(
                    "enableNotifications",
                    !settings.enableNotifications
                  )
                }
                className="text-2xl text-pink-400 hover:text-pink-300"
              >
                {settings.enableNotifications ? (
                  <FaToggleOn />
                ) : (
                  <FaToggleOff />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">
                  SMS Notifications
                </h3>
                <p className="text-sm text-gray-400">
                  Send SMS notifications for urgent events
                </p>
              </div>
              <button
                onClick={() =>
                  handleInputChange("enableSMS", !settings.enableSMS)
                }
                className="text-2xl text-pink-400 hover:text-pink-300"
              >
                {settings.enableSMS ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          </div>
        );

      case "system":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">
                  Maintenance Mode
                </h3>
                <p className="text-sm text-gray-400">
                  Put the site in maintenance mode
                </p>
              </div>
              <button
                onClick={() =>
                  handleInputChange(
                    "maintenanceMode",
                    !settings.maintenanceMode
                  )
                }
                className="text-2xl text-pink-400 hover:text-pink-300"
              >
                {settings.maintenanceMode ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">
                  System Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Database</span>
                    <span className="text-green-400">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Cache</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Storage</span>
                    <span className="text-green-400">Available</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
                    Clear Cache
                  </button>
                  <button className="w-full bg-green-500/20 text-green-400 py-2 rounded-lg hover:bg-green-500/30 transition-colors">
                    Backup Database
                  </button>
                  <button className="w-full bg-yellow-500/20 text-yellow-400 py-2 rounded-lg hover:bg-yellow-500/30 transition-colors">
                    Run Maintenance
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Configure your admin panel settings</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors mt-4 sm:mt-0"
        >
          <FaSave className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-pink-500/20 text-pink-400"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
