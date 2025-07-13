import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

/**
 * Get specific service details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceId = params.id;

    // Get service by ID
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

    // Add extended fields until schema is updated
    const serviceWithExtras = {
      ...service,
      duration: 60, // Will be from DB after schema update (in minutes)
      images: [], // Will be from DB after schema update
      isActive: true, // Will be from DB after schema update
      categoryId: null, // Will be from DB after schema update
      category: null, // Will be from DB after schema update
      staff: [], // Will be from DB after schema update
      timeSlots: [], // Will be from DB after schema update
      updatedAt: service.createdAt, // Will be from DB after schema update
    };

    return NextResponse.json({
      success: true,
      data: serviceWithExtras,
    });
  } catch (error) {
    console.error("Service retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch service",
      },
      { status: 500 }
    );
  }
}

/**
 * Update service (Admin only)
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

    const serviceId = params.id;
    const body = await request.json();
    const {
      name,
      description,
      price,
      duration,
      imageUrl,
      images,
      categoryId,
      isActive,
    } = body;

    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!existingService) {
      return NextResponse.json(
        {
          success: false,
          error: "Service not found",
        },
        { status: 404 }
      );
    }

    // Validate price if provided
    if (price !== undefined && price <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Price must be greater than 0",
        },
        { status: 400 }
      );
    }

    // Validate duration if provided
    if (duration !== undefined && duration <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Duration must be greater than 0",
        },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    if (name) updateData.name = name.trim();
    if (description) updateData.description = description.trim();
    if (price !== undefined) updateData.price = parseFloat(price);
    if (imageUrl) updateData.imageUrl = imageUrl.trim();

    // Update service
    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: updateData,
    });

    // Add extended fields for response
    const serviceWithExtras = {
      ...updatedService,
      duration: duration ? parseInt(duration) : 60, // Will be stored in DB after schema update
      images: Array.isArray(images) ? images : [], // Will be stored in DB after schema update
      isActive: isActive !== undefined ? Boolean(isActive) : true, // Will be stored in DB after schema update
      categoryId: categoryId || null, // Will be stored in DB after schema update
      category: null, // Will be from DB after schema update
      staff: [], // Will be from DB after schema update
      timeSlots: [], // Will be from DB after schema update
      updatedAt: new Date(), // Will be from DB after schema update
    };

    return NextResponse.json(
      {
        success: true,
        data: serviceWithExtras,
        message: "Service updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Service update error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update service",
      },
      { status: 500 }
    );
  }
}

/**
 * Delete service (Admin only)
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

    const serviceId = params.id;

    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!existingService) {
      return NextResponse.json(
        {
          success: false,
          error: "Service not found",
        },
        { status: 404 }
      );
    }

    // Note: In production, you might want to check if service has appointments
    // and prevent deletion or implement soft delete

    // Delete service
    await prisma.service.delete({
      where: { id: serviceId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Service deletion error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete service",
      },
      { status: 500 }
    );
  }
}
