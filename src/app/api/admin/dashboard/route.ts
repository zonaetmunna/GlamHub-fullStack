import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

/**
 * Get admin dashboard statistics and overview (Admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin role
    const { user, error } = await authMiddleware(request, ["ADMIN"]);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    // Get basic counts from database
    const [userCount, productCount, serviceCount, orderCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.product.count(),
        prisma.service.count(),
        prisma.order.count(),
      ]);

    // Note: Full dashboard data will be available after schema update
    // For now, return comprehensive mock data structure
    const dashboardData = {
      // Overview Statistics
      overview: {
        totalUsers: userCount,
        totalProducts: productCount,
        totalServices: serviceCount,
        totalOrders: orderCount,
        totalRevenue: 25670.5,
        totalAppointments: 147,
        totalStaff: 8,
        activePromotions: 3,
      },

      // Recent Activity
      recentActivity: {
        newUsers: 12,
        newOrders: 8,
        newAppointments: 15,
        newApplications: 3,
        timeframe: "last 7 days",
      },

      // Revenue Analytics
      revenue: {
        today: 1245.0,
        thisWeek: 8760.5,
        thisMonth: 25670.5,
        lastMonth: 23450.0,
        growth: {
          daily: 12.5,
          weekly: 8.2,
          monthly: 9.5,
        },
      },

      // Order Analytics
      orders: {
        pending: 5,
        processing: 12,
        shipped: 8,
        delivered: 142,
        cancelled: 3,
        totalValue: 18450.0,
        averageOrderValue: 125.5,
      },

      // Appointment Analytics
      appointments: {
        today: 6,
        thisWeek: 28,
        confirmed: 23,
        pending: 8,
        cancelled: 2,
        completed: 114,
        upcomingToday: [
          {
            id: "app-1",
            time: "10:00",
            service: "Hair Styling",
            staff: "Sarah Johnson",
            client: "John Doe",
            status: "CONFIRMED",
          },
          {
            id: "app-2",
            time: "14:30",
            service: "Makeup",
            staff: "Maria Garcia",
            client: "Jane Smith",
            status: "CONFIRMED",
          },
        ],
      },

      // Staff Performance
      staff: {
        total: 8,
        active: 7,
        onLeave: 1,
        topPerformers: [
          {
            id: "staff-1",
            name: "Sarah Johnson",
            specialization: "Hair Styling",
            appointmentsThisMonth: 45,
            revenue: 5400.0,
            rating: 4.8,
          },
          {
            id: "staff-2",
            name: "Maria Garcia",
            specialization: "Makeup",
            appointmentsThisMonth: 38,
            revenue: 4560.0,
            rating: 4.9,
          },
        ],
      },

      // Product Analytics
      products: {
        total: productCount,
        active: productCount,
        outOfStock: 3,
        lowStock: 7,
        topSelling: [
          {
            id: "prod-1",
            name: "Premium Hair Serum",
            sales: 45,
            revenue: 2250.0,
            category: "Hair Care",
          },
          {
            id: "prod-2",
            name: "Luxury Face Mask",
            sales: 32,
            revenue: 1920.0,
            category: "Skincare",
          },
        ],
      },

      // Service Analytics
      services: {
        total: serviceCount,
        active: serviceCount,
        mostBooked: [
          {
            id: "serv-1",
            name: "Hair Styling",
            bookings: 67,
            revenue: 8040.0,
            averageRating: 4.7,
          },
          {
            id: "serv-2",
            name: "Makeup & Beauty",
            bookings: 54,
            revenue: 6480.0,
            averageRating: 4.8,
          },
        ],
      },

      // Customer Analytics
      customers: {
        total: userCount,
        new: 12,
        returning: 89,
        loyalCustomers: 23,
        averageLifetimeValue: 340.5,
        churnRate: 5.2,
      },

      // Marketing Analytics
      marketing: {
        activePromotions: 3,
        totalDiscountGiven: 1250.0,
        emailCampaigns: 2,
        newsletterSubscribers: 245,
        socialMediaFollowers: 1580,
        reviewsThisMonth: 18,
        averageRating: 4.6,
      },

      // System Health
      system: {
        uptime: "99.9%",
        lastBackup: new Date("2024-01-15T02:00:00Z"),
        storageUsed: "2.3GB",
        apiRequestsToday: 1247,
        errors: 2,
        warnings: 5,
      },

      // Recent Notifications
      recentNotifications: [
        {
          id: "notif-1",
          type: "SYSTEM_UPDATE",
          message: "System backup completed successfully",
          timestamp: new Date("2024-01-15T02:00:00Z"),
          priority: "LOW",
        },
        {
          id: "notif-2",
          type: "ORDER_ALERT",
          message: "New order #ORD-12345 requires attention",
          timestamp: new Date("2024-01-15T09:30:00Z"),
          priority: "MEDIUM",
        },
        {
          id: "notif-3",
          type: "INVENTORY_ALERT",
          message: "Low stock alert: Premium Hair Serum",
          timestamp: new Date("2024-01-15T10:15:00Z"),
          priority: "HIGH",
        },
      ],

      // Quick Actions
      quickActions: [
        {
          id: "create-product",
          title: "Add New Product",
          description: "Create a new product listing",
          icon: "plus",
          url: "/admin/products/new",
        },
        {
          id: "create-service",
          title: "Add New Service",
          description: "Create a new service offering",
          icon: "service",
          url: "/admin/services/new",
        },
        {
          id: "staff-schedule",
          title: "Manage Staff Schedule",
          description: "View and update staff schedules",
          icon: "calendar",
          url: "/admin/staff/schedule",
        },
        {
          id: "view-reports",
          title: "View Reports",
          description: "Access detailed analytics reports",
          icon: "chart",
          url: "/admin/reports",
        },
      ],

      // Generated timestamp
      generatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dashboard data",
      },
      { status: 500 }
    );
  }
}
