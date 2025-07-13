import { apiSlice } from "../api/apiSlice";

// Admin Dashboard Types
export interface AdminDashboardData {
  overview: {
    totalUsers: number;
    totalProducts: number;
    totalServices: number;
    totalOrders: number;
    totalRevenue: number;
    totalAppointments: number;
    totalStaff: number;
    activePromotions: number;
  };
  recentActivity: {
    newUsers: number;
    newOrders: number;
    newAppointments: number;
    newApplications: number;
    timeframe: string;
  };
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    lastMonth: number;
    growth: {
      daily: number;
      weekly: number;
      monthly: number;
    };
  };
  orders: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    totalValue: number;
    averageOrderValue: number;
  };
  appointments: {
    today: number;
    thisWeek: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    completed: number;
    upcomingToday: Array<{
      id: string;
      time: string;
      service: string;
      staff: string;
      client: string;
      status: string;
    }>;
  };
  staff: {
    total: number;
    active: number;
    onLeave: number;
    topPerformers: Array<{
      id: string;
      name: string;
      specialization: string;
      appointmentsThisMonth: number;
      revenue: number;
      rating: number;
    }>;
  };
  products: {
    total: number;
    active: number;
    outOfStock: number;
    lowStock: number;
    topSelling: Array<{
      id: string;
      name: string;
      sales: number;
      revenue: number;
      category: string;
    }>;
  };
  services: {
    total: number;
    active: number;
    mostBooked: Array<{
      id: string;
      name: string;
      bookings: number;
      revenue: number;
      averageRating: number;
    }>;
  };
  customers: {
    total: number;
    new: number;
    returning: number;
    loyalCustomers: number;
    averageLifetimeValue: number;
    churnRate: number;
  };
  marketing: {
    activePromotions: number;
    totalDiscountGiven: number;
    emailCampaigns: number;
    newsletterSubscribers: number;
    socialMediaFollowers: number;
    reviewsThisMonth: number;
    averageRating: number;
  };
  system: {
    uptime: string;
    lastBackup: Date;
    storageUsed: string;
    apiRequestsToday: number;
    errors: number;
    warnings: number;
  };
  recentNotifications: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: Date;
    priority: string;
  }>;
  generatedAt: Date;
}

export interface AdminDashboardResponse {
  success: boolean;
  data: AdminDashboardData;
}

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get admin dashboard data
    getAdminDashboard: builder.query<AdminDashboardResponse, void>({
      query: () => "/admin/dashboard",
      providesTags: ["Admin"],
    }),
  }),
});

export const { useGetAdminDashboardQuery } = adminApiSlice;
