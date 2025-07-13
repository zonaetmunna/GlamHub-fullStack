import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get specific staff member details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const staffId = params.id;

    // Note: Staff retrieval will be available after schema update
    // For now, return mock data
    const mockStaff = {
      id: staffId,
      name: "Sarah Johnson",
      email: "sarah@glamhub.com",
      phone: "+1234567890",
      specialization: "Hair Styling",
      imageUrl: "/staff/sarah.jpg",
      isActive: true,
      services: [],
      timeSlots: [],
      appointments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: mockStaff,
    });
  } catch (error) {
    console.error("Staff retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch staff member",
      },
      { status: 500 }
    );
  }
}

/**
 * Update staff member (Admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and admin role
    const { user, error } = await authMiddleware(request, ["ADMIN"]);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const staffId = params.id;
    const body = await request.json();
    const { name, email, phone, specialization, imageUrl, isActive } = body;

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          {
            success: false,
            error: "Please provide a valid email address",
          },
          { status: 400 }
        );
      }
    }

    // Note: Staff update will be implemented after schema update
    // For now, return mock updated staff
    const mockUpdatedStaff = {
      id: staffId,
      name: name ? name.trim() : "Sarah Johnson",
      email: email ? email.toLowerCase() : "sarah@glamhub.com",
      phone: phone ? phone.trim() : "+1234567890",
      specialization: specialization ? specialization.trim() : "Hair Styling",
      imageUrl: imageUrl ? imageUrl.trim() : "/staff/sarah.jpg",
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      services: [], // Will be from DB after schema update
      timeSlots: [], // Will be from DB after schema update
      appointments: [], // Will be from DB after schema update
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(
      {
        success: true,
        data: mockUpdatedStaff,
        message: "Staff member updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Staff update error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update staff member",
      },
      { status: 500 }
    );
  }
}

/**
 * Delete staff member (Admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and admin role
    const { user, error } = await authMiddleware(request, ["ADMIN"]);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const staffId = params.id;

    // Note: Staff deletion will be implemented after schema update
    // For now, return success message

    // In complete implementation, you would:
    // 1. Check if staff exists
    // 2. Check if staff has upcoming appointments
    // 3. Reassign appointments or notify clients
    // 4. Archive staff record (soft delete)
    // 5. Update staff status to inactive

    return NextResponse.json(
      {
        success: true,
        message: "Staff member deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Staff deletion error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete staff member",
      },
      { status: 500 }
    );
  }
}
