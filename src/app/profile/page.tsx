"use client";

import { useGetAppointmentsQuery } from "@/features/appointments/appointmentApiSlice";
import { useAppSelector } from "@/features/hooks";
import { useGetNotificationsQuery } from "@/features/notifications/notificationApiSlice";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/features/user/userApiSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaBell,
  FaCalendarAlt,
  FaCheck,
  FaEdit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaShoppingBag,
  FaTimes,
  FaUser,
} from "react-icons/fa";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function Profile() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const { data: profileData, isLoading: profileLoading } =
    useGetUserProfileQuery(undefined, { skip: !isAuthenticated });

  const { data: appointmentsData } = useGetAppointmentsQuery(
    { page: 1, limit: 5 },
    { skip: !isAuthenticated }
  );

  const { data: notificationsData } = useGetNotificationsQuery(
    { page: 1, limit: 5 },
    { skip: !isAuthenticated }
  );

  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Initialize form with existing data
  const initializeForm = () => {
    if (profileData?.data) {
      setValue("name", profileData.data.name || "");
      setValue("email", profileData.data.email || "");
      setValue("phone", profileData.data.phone || "");
      setValue("address", profileData.data.address || "");
      setValue("city", profileData.data.city || "");
      setValue("country", profileData.data.country || "");
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updateData: any = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
      };

      if (data.currentPassword && data.newPassword) {
        if (data.newPassword !== data.confirmPassword) {
          toast.error("New password and confirm password do not match");
          return;
        }
        updateData.currentPassword = data.currentPassword;
        updateData.newPassword = data.newPassword;
      }

      await updateProfile(updateData).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    initializeForm();
  };

  const handleCancel = () => {
    setIsEditing(false);
    initializeForm();
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "appointments", label: "Appointments", icon: FaCalendarAlt },
    { id: "notifications", label: "Notifications", icon: FaBell },
  ];

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {profileData?.data.profileImage ? (
                <Image
                  src={profileData.data.profileImage}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
                  <FaUser className="w-8 h-8 text-pink-600" />
                </div>
              )}
              <button className="absolute bottom-0 right-0 bg-pink-500 text-white rounded-full p-2 hover:bg-pink-600 transition-colors">
                <FaEdit className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profileData?.data.name || "Welcome"}
              </h1>
              <p className="text-gray-600">{profileData?.data.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <FaShoppingBag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {profileData?.data.stats?.totalOrders || 0} Orders
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {profileData?.data.stats?.totalAppointments || 0}{" "}
                    Appointments
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600">
                    Total Spent: ${profileData?.data.stats?.totalSpent || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-pink-500 text-pink-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Profile Form */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={updateLoading}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        <FaCheck className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                      >
                        <FaTimes className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline w-4 h-4 mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline w-4 h-4 mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="inline w-4 h-4 mr-1" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="inline w-4 h-4 mr-1" />
                      Country
                    </label>
                    <input
                      type="text"
                      {...register("country")}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      {...register("city")}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      {...register("address")}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
                    />
                  </div>

                  {/* Password Change Section */}
                  {isEditing && (
                    <>
                      <div className="md:col-span-2">
                        <h3 className="text-md font-semibold text-gray-900 mb-4">
                          Change Password
                        </h3>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          {...register("currentPassword")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          {...register("newPassword")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          {...register("confirmPassword")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </>
                  )}
                </form>
              </div>
            )}

            {activeTab === "appointments" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Appointments
                </h2>
                <div className="space-y-4">
                  {appointmentsData?.data.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border border-gray-200 rounded-md p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {appointment.service.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Staff: {appointment.staff.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date:{" "}
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Notifications
                </h2>
                <div className="space-y-4">
                  {notificationsData?.data.map((notification) => (
                    <div
                      key={notification.id}
                      className="border border-gray-200 rounded-md p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(
                              notification.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
