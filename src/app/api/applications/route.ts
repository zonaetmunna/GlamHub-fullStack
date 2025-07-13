import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get user's applications (users get their own applications, admins get all)
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
    const jobId = searchParams.get("jobId");
    const skip = (page - 1) * limit;

    // Note: User applications will be available after schema update
    // For now, return mock data
    const mockApplications = [
      {
        id: "app-1",
        jobId: "job-1",
        userId: user!.id,
        firstName: "John",
        lastName: "Doe",
        email: user!.email,
        phone: "+1234567890",
        coverLetter: "I am excited to apply for this position...",
        resumeUrl: "/uploads/resumes/john-doe-resume.pdf",
        linkedinUrl: "https://linkedin.com/in/johndoe",
        portfolioUrl: "https://johndoe.com",
        experience: "5 years",
        education: "Bachelor's in Business",
        skills: "Hair cutting, coloring, styling, customer service",
        availability: "Immediate",
        expectedSalary: "$55,000",
        status: "PENDING",
        appliedAt: new Date("2024-01-05"),
        reviewedAt: null,
        reviewedBy: null,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        job: {
          id: "job-1",
          title: "Senior Hair Stylist",
          company: "GlamHub",
          location: "New York, NY",
          type: "FULL_TIME",
          isActive: true,
        },
      },
      {
        id: "app-2",
        jobId: "job-2",
        userId: user!.id,
        firstName: "John",
        lastName: "Doe",
        email: user!.email,
        phone: "+1234567890",
        coverLetter: "I would love to join your makeup team...",
        resumeUrl: "/uploads/resumes/john-doe-resume.pdf",
        linkedinUrl: "https://linkedin.com/in/johndoe",
        portfolioUrl: "https://johndoe.com",
        experience: "3 years",
        education: "Cosmetology Certificate",
        skills: "Makeup, skincare, bridal services",
        availability: "2 weeks notice",
        expectedSalary: "$45,000",
        status: "REVIEWED",
        appliedAt: new Date("2024-01-03"),
        reviewedAt: new Date("2024-01-08"),
        reviewedBy: "admin-1",
        notes: "Application under review",
        createdAt: new Date(),
        updatedAt: new Date(),
        job: {
          id: "job-2",
          title: "Makeup Artist",
          company: "GlamHub",
          location: "Los Angeles, CA",
          type: "PART_TIME",
          isActive: true,
        },
      },
    ];

    // Filter applications based on user role
    let filteredApplications = mockApplications;

    // Regular users can only see their own applications
    if (user!.role !== "ADMIN") {
      filteredApplications = filteredApplications.filter(
        (app) => app.userId === user!.id
      );
    }

    // Filter by status if provided
    if (status) {
      filteredApplications = filteredApplications.filter(
        (app) => app.status === status
      );
    }

    // Filter by job if provided
    if (jobId) {
      filteredApplications = filteredApplications.filter(
        (app) => app.jobId === jobId
      );
    }

    const totalCount = filteredApplications.length;
    const paginatedApplications = filteredApplications.slice(
      skip,
      skip + limit
    );

    return NextResponse.json({
      success: true,
      data: paginatedApplications,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPreviousPage: page > 1,
      },
      summary: {
        total: filteredApplications.length,
        pending: filteredApplications.filter((app) => app.status === "PENDING")
          .length,
        reviewed: filteredApplications.filter(
          (app) => app.status === "REVIEWED"
        ).length,
        accepted: filteredApplications.filter(
          (app) => app.status === "ACCEPTED"
        ).length,
        rejected: filteredApplications.filter(
          (app) => app.status === "REJECTED"
        ).length,
      },
    });
  } catch (error) {
    console.error("User applications retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch applications",
      },
      { status: 500 }
    );
  }
}
