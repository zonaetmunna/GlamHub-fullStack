import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

/**
 * Get user notifications
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const { user, error } = await authMiddleware(request);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const isRead = searchParams.get("read");
    const type = searchParams.get("type");
    const skip = (page - 1) * limit;

    // Note: Notifications will be available after schema update
    // For now, return mock data
    const mockNotifications = [
      {
        id: "notif-1",
        userId: user!.id,
        type: "ORDER_CONFIRMATION",
        title: "Order Confirmed",
        message:
          "Your order #ORD-12345 has been confirmed and is being processed.",
        isRead: false,
        data: {
          orderId: "order-123",
          orderNumber: "ORD-12345",
        },
        createdAt: new Date("2024-01-15T10:00:00Z"),
        updatedAt: new Date("2024-01-15T10:00:00Z"),
      },
      {
        id: "notif-2",
        userId: user!.id,
        type: "APPOINTMENT_REMINDER",
        title: "Appointment Reminder",
        message:
          "Your appointment with Sarah Johnson is scheduled for tomorrow at 2:00 PM.",
        isRead: false,
        data: {
          appointmentId: "app-456",
          staffName: "Sarah Johnson",
          appointmentDate: "2024-01-16T14:00:00Z",
        },
        createdAt: new Date("2024-01-14T15:00:00Z"),
        updatedAt: new Date("2024-01-14T15:00:00Z"),
      },
      {
        id: "notif-3",
        userId: user!.id,
        type: "PROMOTION",
        title: "Special Offer",
        message:
          "Get 20% off on all hair services this weekend! Use code WEEKEND20.",
        isRead: true,
        data: {
          promoCode: "WEEKEND20",
          discount: 20,
          validUntil: "2024-01-20T23:59:59Z",
        },
        createdAt: new Date("2024-01-10T12:00:00Z"),
        updatedAt: new Date("2024-01-12T09:00:00Z"),
      },
      {
        id: "notif-4",
        userId: user!.id,
        type: "PAYMENT_SUCCESS",
        title: "Payment Successful",
        message: "Your payment of $120.00 has been processed successfully.",
        isRead: true,
        data: {
          amount: 120.0,
          paymentId: "pay-789",
        },
        createdAt: new Date("2024-01-08T11:30:00Z"),
        updatedAt: new Date("2024-01-08T11:30:00Z"),
      },
    ];

    // Filter notifications based on user role
    let filteredNotifications = mockNotifications;

    // Regular users can only see their own notifications
    if (user!.role !== "ADMIN") {
      filteredNotifications = filteredNotifications.filter(
        (notif) => notif.userId === user!.id
      );
    }

    // Filter by read status if provided
    if (isRead !== null) {
      const readFilter = isRead === "true";
      filteredNotifications = filteredNotifications.filter(
        (notif) => notif.isRead === readFilter
      );
    }

    // Filter by type if provided
    if (type) {
      filteredNotifications = filteredNotifications.filter(
        (notif) => notif.type === type
      );
    }

    // Sort by creation date (newest first)
    filteredNotifications.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const totalCount = filteredNotifications.length;
    const paginatedNotifications = filteredNotifications.slice(
      skip,
      skip + limit
    );

    return NextResponse.json({
      success: true,
      data: paginatedNotifications,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPreviousPage: page > 1,
      },
      summary: {
        total: filteredNotifications.length,
        unread: filteredNotifications.filter((notif) => !notif.isRead).length,
        read: filteredNotifications.filter((notif) => notif.isRead).length,
      },
    });
  } catch (error) {
    console.error("Notifications retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch notifications",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new notification (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const { user, error } = await authMiddleware(request, ["ADMIN"]);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const body = await request.json();
    const { userId, type, title, message, data, sendToAll = false } = body;

    // Validate required fields
    if (!type || !title || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Type, title, and message are required",
        },
        { status: 400 }
      );
    }

    // Validate notification type
    const validTypes = [
      "ORDER_CONFIRMATION",
      "ORDER_SHIPPED",
      "ORDER_DELIVERED",
      "APPOINTMENT_CONFIRMATION",
      "APPOINTMENT_REMINDER",
      "APPOINTMENT_CANCELLED",
      "PAYMENT_SUCCESS",
      "PAYMENT_FAILED",
      "PROMOTION",
      "SYSTEM_UPDATE",
      "GENERAL",
    ];

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid notification type",
        },
        { status: 400 }
      );
    }

    // Validate user exists if specific user notification
    if (!sendToAll && userId) {
      const targetUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!targetUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Target user not found",
          },
          { status: 404 }
        );
      }
    }

    // Note: Notification creation will be implemented after schema update
    // For now, return mock response
    const mockNotification = {
      id: `notif-${Date.now()}`,
      userId: sendToAll ? null : userId || user!.id,
      type,
      title: title.trim(),
      message: message.trim(),
      isRead: false,
      data: data || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In complete implementation, you would:
    // 1. Create notification record(s) in database
    // 2. Send push notification if enabled
    // 3. Send email notification if configured
    // 4. Log notification for analytics

    return NextResponse.json(
      {
        success: true,
        data: mockNotification,
        message: sendToAll
          ? "Notification sent to all users"
          : "Notification created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Notification creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create notification",
      },
      { status: 500 }
    );
  }
}
