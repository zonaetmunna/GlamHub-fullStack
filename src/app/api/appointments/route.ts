import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

/**
 * Get appointments (users get their appointments, admins get all appointments)
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
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const serviceId = searchParams.get("serviceId");
    const staffId = searchParams.get("staffId");
    const date = searchParams.get("date");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Regular users can only see their own appointments
    if (user!.role !== "ADMIN") {
      where.userId = user!.id;
    }

    // Filter by status if provided
    if (status) {
      where.status = status;
    }

    // Filter by service if provided
    if (serviceId) {
      where.serviceId = serviceId;
    }

    // Filter by staff if provided
    if (staffId) {
      where.staffId = staffId;
    }

    // Filter by date if provided
    if (date) {
      const appointmentDate = new Date(date);
      const nextDay = new Date(appointmentDate);
      nextDay.setDate(nextDay.getDate() + 1);

      where.appointmentDate = {
        gte: appointmentDate,
        lt: nextDay,
      };
    }

    // Note: Appointments will be available after schema update
    // For now, return mock data structure
    const mockAppointments = [
      {
        id: "app-1",
        userId: user!.id,
        serviceId: "service-1",
        staffId: "staff-1",
        appointmentDate: new Date("2024-01-15"),
        timeSlot: "10:00-11:00",
        status: "CONFIRMED",
        totalPrice: 120.0,
        notes: "First appointment",
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: user!.id,
          name: user!.name,
          email: user!.email,
        },
        service: {
          id: "service-1",
          name: "Hair Styling",
          price: 120.0,
          duration: 60,
        },
        staff: {
          id: "staff-1",
          name: "Sarah Johnson",
          specialization: "Hair Styling",
        },
      },
    ];

    // Apply filters to mock data
    let filteredAppointments = mockAppointments;

    if (user!.role !== "ADMIN") {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.userId === user!.id
      );
    }

    const totalCount = filteredAppointments.length;
    const paginatedAppointments = filteredAppointments.slice(
      skip,
      skip + limit
    );

    return NextResponse.json({
      success: true,
      data: paginatedAppointments,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Appointments retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch appointments",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new appointment (Authenticated users only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { user, error } = await authMiddleware(request);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const body = await request.json();
    const { serviceId, staffId, appointmentDate, timeSlot, notes } = body;

    // Validate required fields
    if (!serviceId || !staffId || !appointmentDate || !timeSlot) {
      return NextResponse.json(
        {
          success: false,
          error: "Service, staff, date, and time slot are required",
        },
        { status: 400 }
      );
    }

    // Validate appointment date (must be in future)
    const appointmentDateTime = new Date(appointmentDate);
    const now = new Date();

    if (appointmentDateTime <= now) {
      return NextResponse.json(
        {
          success: false,
          error: "Appointment date must be in the future",
        },
        { status: 400 }
      );
    }

    // Check if service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          error: "Service not found",
        },
        { status: 404 }
      );
    }

    // Note: In complete implementation, you would:
    // 1. Check if staff exists and is available
    // 2. Check if time slot is available
    // 3. Validate staff can perform the service
    // 4. Create appointment record
    // 5. Block the time slot
    // 6. Send confirmation email

    // Mock appointment creation
    const mockAppointment = {
      id: `app-${Date.now()}`,
      userId: user!.id,
      serviceId,
      staffId,
      appointmentDate: appointmentDateTime,
      timeSlot,
      status: "CONFIRMED",
      totalPrice: service.price,
      notes: notes?.trim() || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: user!.id,
        name: user!.name,
        email: user!.email,
      },
      service: {
        id: service.id,
        name: service.name,
        price: service.price,
        duration: 60, // Will be from DB after schema update
      },
      staff: {
        id: staffId,
        name: "Sarah Johnson", // Will be from DB after schema update
        specialization: "Hair Styling", // Will be from DB after schema update
      },
    };

    return NextResponse.json(
      {
        success: true,
        data: mockAppointment,
        message: "Appointment booked successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Appointment creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create appointment",
      },
      { status: 500 }
    );
  }
}
