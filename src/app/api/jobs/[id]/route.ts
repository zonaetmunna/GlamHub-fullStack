import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get specific job details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = params.id;

    // Note: Job retrieval will be available after schema update
    // For now, return mock data
    const mockJob = {
      id: jobId,
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
      applications: [
        {
          id: "app-1",
          jobId: jobId,
          userId: "user-1",
          status: "PENDING",
          appliedAt: new Date(),
          user: {
            name: "John Doe",
            email: "john@example.com",
          },
        },
      ],
    };

    return NextResponse.json({
      success: true,
      data: mockJob,
    });
  } catch (error) {
    console.error("Job retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch job",
      },
      { status: 500 }
    );
  }
}

/**
 * Update job listing (Admin only)
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

    const jobId = params.id;
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
      isActive,
      closingDate,
    } = body;

    // Validate job type if provided
    if (
      type &&
      !["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"].includes(type)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid job type",
        },
        { status: 400 }
      );
    }

    // Validate experience level if provided
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

    // Validate closing date if provided
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

    // Note: Job update will be implemented after schema update
    // For now, return mock updated job
    const mockUpdatedJob = {
      id: jobId,
      title: title || "Senior Hair Stylist",
      description: description || "Updated job description",
      requirements: requirements || "Updated requirements",
      responsibilities: responsibilities || "Updated responsibilities",
      type: type || "FULL_TIME",
      location: location || "New York, NY",
      department: department || "Hair Services",
      salaryRange: salaryRange || "$45,000 - $65,000",
      experienceLevel: experienceLevel || "SENIOR",
      benefits:
        benefits || "Health insurance, paid time off, employee discounts",
      isActive: isActive !== undefined ? isActive : true,
      postedDate: new Date("2024-01-01"),
      closingDate: closingDate ? new Date(closingDate) : new Date("2024-02-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
      applications: [],
    };

    return NextResponse.json(
      {
        success: true,
        data: mockUpdatedJob,
        message: "Job listing updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Job update error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update job listing",
      },
      { status: 500 }
    );
  }
}

/**
 * Delete job listing (Admin only)
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

    const jobId = params.id;

    // Note: Job deletion will be implemented after schema update
    // For now, return success message

    // In complete implementation, you would:
    // 1. Check if job exists
    // 2. Check if there are pending applications
    // 3. Optionally notify applicants
    // 4. Archive instead of delete (soft delete)
    // 5. Update job status to inactive

    return NextResponse.json(
      {
        success: true,
        message: "Job listing deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Job deletion error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete job listing",
      },
      { status: 500 }
    );
  }
}
