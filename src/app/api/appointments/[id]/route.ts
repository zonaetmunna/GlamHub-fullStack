import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get specific appointment details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const { user, error } = await authMiddleware(request);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const appointmentId = params.id;

    // Note: Appointment retrieval will be available after schema update
    // For now, return mock data
    const mockAppointment = {
      id: appointmentId,
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
    };

    // Check if user owns this appointment or is admin
    if (user!.role !== "ADMIN" && mockAppointment.userId !== user!.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Access denied",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mockAppointment,
    });
  } catch (error) {
    console.error("Appointment retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch appointment",
      },
      { status: 500 }
    );
  }
}

/**
 * Update appointment (reschedule or modify)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const { user, error } = await authMiddleware(request);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const appointmentId = params.id;
    const body = await request.json();
    const { appointmentDate, timeSlot, notes, status } = body;

    // Check if user owns this appointment or is admin
    // Note: This will be actual DB check after schema update
    if (user!.role !== "ADMIN") {
      // Additional ownership check would go here
    }

    // Validate new appointment date if provided
    if (appointmentDate) {
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
    }

    // Validate status if provided
    if (
      status &&
      !["CONFIRMED", "PENDING", "CANCELLED", "COMPLETED"].includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status",
        },
        { status: 400 }
      );
    }

    // Note: Appointment update will be implemented after schema update
    // For now, return mock updated appointment
    const mockUpdatedAppointment = {
      id: appointmentId,
      userId: user!.id,
      serviceId: "service-1",
      staffId: "staff-1",
      appointmentDate: appointmentDate
        ? new Date(appointmentDate)
        : new Date("2024-01-15"),
      timeSlot: timeSlot || "10:00-11:00",
      status: status || "CONFIRMED",
      totalPrice: 120.0,
      notes: notes?.trim() || "Updated appointment",
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
    };

    return NextResponse.json(
      {
        success: true,
        data: mockUpdatedAppointment,
        message: "Appointment updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Appointment update error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update appointment",
      },
      { status: 500 }
    );
  }
}

/**
 * Cancel appointment
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const { user, error } = await authMiddleware(request);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const appointmentId = params.id;

    // Check if user owns this appointment or is admin
    // Note: This will be actual DB check after schema update
    if (user!.role !== "ADMIN") {
      // Additional ownership check would go here
    }

    // Note: Appointment cancellation will be implemented after schema update
    // For now, return success message

    // In complete implementation, you would:
    // 1. Check if appointment exists
    // 2. Check if it's not already cancelled
    // 3. Check cancellation policy (e.g., 24 hours before)
    // 4. Update status to CANCELLED
    // 5. Free up the time slot
    // 6. Send cancellation confirmation email
    // 7. Handle refund if applicable

    return NextResponse.json(
      {
        success: true,
        message: "Appointment cancelled successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Appointment cancellation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to cancel appointment",
      },
      { status: 500 }
    );
  }
}
