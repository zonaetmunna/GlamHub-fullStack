import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get all job listings
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type");
    const location = searchParams.get("location");
    const department = searchParams.get("department");
    const isActive = searchParams.get("active");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Note: Jobs model will be available after schema update
    // For now, return mock data structure
    const mockJobs = [
      {
        id: "job-1",
        title: "Senior Hair Stylist",
        description:
          "We are looking for an experienced hair stylist to join our team. Must have 3+ years of experience and be skilled in cutting, coloring, and styling.",
        requirements:
          "3+ years experience, cosmetology license, excellent communication skills",
        responsibilities:
          "Cut, color, and style hair; consult with clients; maintain clean workspace",
        type: "FULL_TIME",
        location: "New York, NY",
        department: "Hair Services",
        salaryRange: "$45,000 - $65,000",
        experienceLevel: "SENIOR",
        benefits: "Health insurance, paid time off, employee discounts",
        isActive: true,
        postedDate: new Date("2024-01-01"),
        closingDate: new Date("2024-02-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
        applications: [],
      },
      {
        id: "job-2",
        title: "Makeup Artist",
        description:
          "Join our makeup team! We're seeking a talented makeup artist for special events and bridal services.",
        requirements:
          "2+ years experience, professional makeup certification, portfolio required",
        responsibilities:
          "Apply makeup for events, bridal consultations, maintain makeup supplies",
        type: "PART_TIME",
        location: "Los Angeles, CA",
        department: "Beauty Services",
        salaryRange: "$30,000 - $45,000",
        experienceLevel: "MID_LEVEL",
        benefits:
          "Flexible schedule, product discounts, professional development",
        isActive: true,
        postedDate: new Date("2024-01-05"),
        closingDate: new Date("2024-02-05"),
        createdAt: new Date(),
        updatedAt: new Date(),
        applications: [],
      },
      {
        id: "job-3",
        title: "Spa Receptionist",
        description:
          "Front desk position at our luxury spa. Handle bookings, customer service, and administrative tasks.",
        requirements:
          "High school diploma, customer service experience, proficiency in booking systems",
        responsibilities:
          "Schedule appointments, handle payments, assist clients, maintain records",
        type: "FULL_TIME",
        location: "Miami, FL",
        department: "Administration",
        salaryRange: "$35,000 - $42,000",
        experienceLevel: "ENTRY_LEVEL",
        benefits:
          "Health insurance, spa services discount, career advancement opportunities",
        isActive: true,
        postedDate: new Date("2024-01-10"),
        closingDate: new Date("2024-02-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
        applications: [],
      },
    ];

    // Apply filters to mock data
    let filteredJobs = mockJobs;

    if (search) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase()) ||
          job.department.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      filteredJobs = filteredJobs.filter((job) => job.type === type);
    }

    if (location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (department) {
      filteredJobs = filteredJobs.filter((job) =>
        job.department.toLowerCase().includes(department.toLowerCase())
      );
    }

    if (isActive !== null) {
      const activeFilter = isActive === "true";
      filteredJobs = filteredJobs.filter(
        (job) => job.isActive === activeFilter
      );
    }

    const totalCount = filteredJobs.length;
    const paginatedJobs = filteredJobs.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      data: paginatedJobs,
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
    console.error("Jobs retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch jobs",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new job listing (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const { user, error } = await authMiddleware(request, ["ADMIN"]);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      requirements,
      responsibilities,
      type,
      location,
      department,
      salaryRange,
      experienceLevel,
      benefits,
      closingDate,
    } = body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !type ||
      !location ||
      !department
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Title, description, requirements, type, location, and department are required",
        },
        { status: 400 }
      );
    }

    // Validate job type
    if (!["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"].includes(type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid job type",
        },
        { status: 400 }
      );
    }

    // Validate experience level
    if (
      experienceLevel &&
      !["ENTRY_LEVEL", "MID_LEVEL", "SENIOR", "EXECUTIVE"].includes(
        experienceLevel
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid experience level",
        },
        { status: 400 }
      );
    }

    // Validate closing date
    if (closingDate) {
      const closingDateTime = new Date(closingDate);
      const now = new Date();

      if (closingDateTime <= now) {
        return NextResponse.json(
          {
            success: false,
            error: "Closing date must be in the future",
          },
          { status: 400 }
        );
      }
    }

    // Note: Job creation will be implemented after schema update
    // For now, return mock response
    const mockJob = {
      id: `job-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      requirements: requirements.trim(),
      responsibilities: responsibilities?.trim() || "",
      type,
      location: location.trim(),
      department: department.trim(),
      salaryRange: salaryRange?.trim() || null,
      experienceLevel: experienceLevel || "MID_LEVEL",
      benefits: benefits?.trim() || null,
      isActive: true,
      postedDate: new Date(),
      closingDate: closingDate ? new Date(closingDate) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      applications: [],
    };

    return NextResponse.json(
      {
        success: true,
        data: mockJob,
        message: "Job listing created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create job listing",
      },
      { status: 500 }
    );
  }
}
