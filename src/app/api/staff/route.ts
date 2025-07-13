import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get all staff members
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const search = searchParams.get("search") || "";
    const specialization = searchParams.get("specialization");
    const isActive = searchParams.get("active");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Note: Staff model will be available after schema update
    // For now, return mock data structure
    const mockStaff = [
      {
        id: "staff-1",
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
      },
      {
        id: "staff-2",
        name: "Maria Garcia",
        email: "maria@glamhub.com",
        phone: "+1234567891",
        specialization: "Makeup & Beauty",
        imageUrl: "/staff/maria.jpg",
        isActive: true,
        services: [],
        timeSlots: [],
        appointments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Apply filters to mock data
    let filteredStaff = mockStaff;

    if (search) {
      filteredStaff = filteredStaff.filter(
        (staff) =>
          staff.name.toLowerCase().includes(search.toLowerCase()) ||
          staff.specialization.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (specialization) {
      filteredStaff = filteredStaff.filter((staff) =>
        staff.specialization
          .toLowerCase()
          .includes(specialization.toLowerCase())
      );
    }

    if (isActive !== null) {
      const activeFilter = isActive === "true";
      filteredStaff = filteredStaff.filter(
        (staff) => staff.isActive === activeFilter
      );
    }

    const totalCount = filteredStaff.length;
    const paginatedStaff = filteredStaff.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      data: paginatedStaff,
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
    console.error("Staff retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch staff members",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new staff member (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const { user, error } = await authMiddleware(request, ["ADMIN"]);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, specialization, imageUrl } = body;

    // Validate required fields
    if (!name || !email || !specialization) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and specialization are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
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

    // Note: Staff creation will be implemented after schema update
    // For now, return mock response
    const mockStaff = {
      id: `staff-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase(),
      phone: phone?.trim() || null,
      specialization: specialization.trim(),
      imageUrl: imageUrl || null,
      isActive: true,
      services: [],
      timeSlots: [],
      appointments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(
      {
        success: true,
        data: mockStaff,
        message: "Staff member created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Staff creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create staff member",
      },
      { status: 500 }
    );
  }
}
