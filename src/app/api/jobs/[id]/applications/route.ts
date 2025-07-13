import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";

/**
 * Get applications for a specific job (Admin only)
 */
export async function GET(
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
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const skip = (page - 1) * limit;

    // Note: Job applications will be available after schema update
    // For now, return mock data
    const mockApplications = [
      {
        id: "app-1",
        jobId: jobId,
        userId: "user-1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
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
        user: {
          id: "user-1",
          name: "John Doe",
          email: "john@example.com",
        },
      },
      {
        id: "app-2",
        jobId: jobId,
        userId: "user-2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "+1234567891",
        coverLetter: "I would love to join your team...",
        resumeUrl: "/uploads/resumes/jane-smith-resume.pdf",
        linkedinUrl: "https://linkedin.com/in/janesmith",
        portfolioUrl: null,
        experience: "3 years",
        education: "Cosmetology Certificate",
        skills: "Hair styling, makeup, nail art, customer relations",
        availability: "2 weeks notice",
        expectedSalary: "$48,000",
        status: "REVIEWED",
        appliedAt: new Date("2024-01-03"),
        reviewedAt: new Date("2024-01-08"),
        reviewedBy: user!.id,
        notes: "Strong candidate, good portfolio",
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: "user-2",
          name: "Jane Smith",
          email: "jane@example.com",
        },
      },
    ];

    // Filter by status if provided
    let filteredApplications = mockApplications;
    if (status) {
      filteredApplications = filteredApplications.filter(
        (app) => app.status === status
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
        total: mockApplications.length,
        pending: mockApplications.filter((app) => app.status === "PENDING")
          .length,
        reviewed: mockApplications.filter((app) => app.status === "REVIEWED")
          .length,
        accepted: mockApplications.filter((app) => app.status === "ACCEPTED")
          .length,
        rejected: mockApplications.filter((app) => app.status === "REJECTED")
          .length,
      },
    });
  } catch (error) {
    console.error("Job applications retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch job applications",
      },
      { status: 500 }
    );
  }
}

/**
 * Apply to a job (Authenticated users only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const { user, error } = await authMiddleware(request);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const jobId = params.id;
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      coverLetter,
      resumeUrl,
      linkedinUrl,
      portfolioUrl,
      experience,
      education,
      skills,
      availability,
      expectedSalary,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !coverLetter) {
      return NextResponse.json(
        {
          success: false,
          error:
            "First name, last name, email, phone, and cover letter are required",
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

    // Check if job exists
    const job = await prisma.service.findUnique({
      where: { id: jobId },
    });

    // Note: Check if user already applied will be implemented after schema update
    // For now, allow duplicate applications

    // Note: Job application creation will be implemented after schema update
    // For now, return mock response
    const mockApplication = {
      id: `app-${Date.now()}`,
      jobId: jobId,
      userId: user!.id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      phone: phone.trim(),
      coverLetter: coverLetter.trim(),
      resumeUrl: resumeUrl?.trim() || null,
      linkedinUrl: linkedinUrl?.trim() || null,
      portfolioUrl: portfolioUrl?.trim() || null,
      experience: experience?.trim() || null,
      education: education?.trim() || null,
      skills: skills?.trim() || null,
      availability: availability?.trim() || null,
      expectedSalary: expectedSalary?.trim() || null,
      status: "PENDING",
      appliedAt: new Date(),
      reviewedAt: null,
      reviewedBy: null,
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: user!.id,
        name: user!.name,
        email: user!.email,
      },
    };

    // Note: In complete implementation, you would:
    // 1. Check if job exists and is active
    // 2. Check if user already applied
    // 3. Validate file uploads (resume, portfolio)
    // 4. Send application confirmation email
    // 5. Notify HR/admin of new application

    return NextResponse.json(
      {
        success: true,
        data: mockApplication,
        message: "Application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job application error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit application",
      },
      { status: 500 }
    );
  }
}
