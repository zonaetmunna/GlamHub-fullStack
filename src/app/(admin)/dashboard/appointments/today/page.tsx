"use client";

import { useGetAppointmentsQuery } from "@/features/appointments/appointmentApiSlice";
import Link from "next/link";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaEye,
  FaPhone,
  FaPlay,
  FaSpa,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";

export default function TodayAppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const {
    data: appointmentsData,
    isLoading,
    error,
    refetch,
  } = useGetAppointmentsQuery({
    date: today,
    status: statusFilter,
    limit: 50, // Show more appointments for today
  });

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case "status":
        setStatusFilter(value);
        break;
      case "time":
        setTimeFilter(value);
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500/20 text-green-400";
      case "COMPLETED":
        return "bg-blue-500/20 text-blue-400";
      case "IN_PROGRESS":
        return "bg-purple-500/20 text-purple-400";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";
      case "CANCELLED":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <FaCheckCircle className="w-4 h-4" />;
      case "COMPLETED":
        return <FaCheckCircle className="w-4 h-4" />;
      case "IN_PROGRESS":
        return <FaPlay className="w-4 h-4" />;
      case "PENDING":
        return <FaClock className="w-4 h-4" />;
      case "CANCELLED":
        return <FaTimesCircle className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  const filterByTime = (appointments: any[]) => {
    if (!timeFilter) return appointments;

    const now = new Date();
    const currentHour = now.getHours();

    return appointments.filter((appointment) => {
      const appointmentTime = new Date(`${today}T${appointment.time}`);
      const appointmentHour = appointmentTime.getHours();

      switch (timeFilter) {
        case "morning":
          return appointmentHour >= 6 && appointmentHour < 12;
        case "afternoon":
          return appointmentHour >= 12 && appointmentHour < 18;
        case "evening":
          return appointmentHour >= 18 && appointmentHour < 24;
        case "upcoming":
          return appointmentHour >= currentHour;
        default:
          return true;
      }
    });
  };

  const getUpcomingNext = (appointments: any[]) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    return appointments
      .filter((appointment) => {
        const [hours, minutes] = appointment.time.split(":").map(Number);
        const appointmentTime = hours * 60 + minutes;
        return (
          appointmentTime > currentTime && appointment.status !== "CANCELLED"
        );
      })
      .sort((a, b) => {
        const [aHours, aMinutes] = a.time.split(":").map(Number);
        const [bHours, bMinutes] = b.time.split(":").map(Number);
        const aTime = aHours * 60 + aMinutes;
        const bTime = bHours * 60 + bMinutes;
        return aTime - bTime;
      })[0];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">
          Failed to load today's appointments
        </div>
        <button
          onClick={() => refetch()}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const filteredAppointments = filterByTime(appointmentsData?.data || []);
  const nextAppointment = getUpcomingNext(appointmentsData?.data || []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Today's Schedule
          </h1>
          <p className="text-gray-400">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Link
            href="/dashboard/appointments/add"
            className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            <FaCalendarAlt className="w-4 h-4" />
            <span>Add Appointment</span>
          </Link>
        </div>
      </div>

      {/* Next Appointment Alert */}
      {nextAppointment && (
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <FaClock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Next Appointment
                </h3>
                <p className="text-gray-300">
                  {nextAppointment.service?.name} with{" "}
                  {nextAppointment.user?.name} at {nextAppointment.time}
                </p>
              </div>
            </div>
            <Link
              href={`/dashboard/appointments/${nextAppointment.id}`}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Today</p>
              <p className="text-2xl font-bold text-white">
                {appointmentsData?.data?.length || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FaCalendarAlt className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-white">
                {appointmentsData?.data?.filter(
                  (appointment) => appointment.status === "COMPLETED"
                ).length || 0}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FaCheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Confirmed</p>
              <p className="text-2xl font-bold text-white">
                {appointmentsData?.data?.filter(
                  (appointment) => appointment.status === "CONFIRMED"
                ).length || 0}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FaUser className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Revenue Today</p>
              <p className="text-2xl font-bold text-white">
                $
                {appointmentsData?.data
                  ?.filter((appointment) => appointment.status === "COMPLETED")
                  .reduce(
                    (sum, appointment) => sum + appointment.totalAmount,
                    0
                  )
                  .toFixed(2) || "0.00"}
              </p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <FaSpa className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Filter by Time
            </label>
            <select
              value={timeFilter}
              onChange={(e) => handleFilterChange("time", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Day</option>
              <option value="morning">Morning (6AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 6PM)</option>
              <option value="evening">Evening (6PM - 12AM)</option>
              <option value="upcoming">Upcoming Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Timeline */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          Today's Appointments
        </h2>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <FaCalendarAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No appointments found</p>
            <p className="text-gray-500">
              Try adjusting your filters or add a new appointment
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <FaClock className="w-4 h-4 text-gray-400" />
                        <span className="text-white font-medium">
                          {appointment.time}
                        </span>
                      </div>
                      <div className="w-px h-8 bg-gray-600"></div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {appointment.user?.name?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {appointment.user?.name || "Unknown User"}
                          </p>
                          <p className="text-sm text-gray-400">
                            {appointment.service?.name || "Unknown Service"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div
                        className={`inline-flex items-center space-x-2 px-3 py-1 text-sm rounded-full ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {getStatusIcon(appointment.status)}
                        <span>{appointment.status}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">
                          ${appointment.totalAmount.toFixed(2)}
                        </span>
                        <span className="text-gray-400">
                          ({appointment.duration}min)
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/dashboard/appointments/${appointment.id}`}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          <FaEye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/dashboard/appointments/${appointment.id}/edit`}
                          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <FaEdit className="w-4 h-4" />
                        </Link>
                        {appointment.user?.phone && (
                          <a
                            href={`tel:${appointment.user.phone}`}
                            className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                          >
                            <FaPhone className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
