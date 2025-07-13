import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

/**
 * Get services with search, filter, and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const duration = searchParams.get("duration");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Search functionality
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get services
    const [services, totalCount] = await Promise.all([
      prisma.service.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.service.count({ where }),
    ]);

    // Add temporary fields until schema is updated
    const servicesWithExtras = services.map((service) => ({
      ...service,
      duration: 60, // Will be from DB after schema update (in minutes)
      images: [], // Will be from DB after schema update
      isActive: true, // Will be from DB after schema update
      categoryId: null, // Will be from DB after schema update
      category: null, // Will be from DB after schema update
      staff: [], // Will be from DB after schema update
      timeSlots: [], // Will be from DB after schema update
    }));

    return NextResponse.json({
      success: true,
      data: servicesWithExtras,
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
    console.error("Services retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new service (Admin only)
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
      name,
      description,
      price,
      duration = 60,
      imageUrl,
      images = [],
      categoryId,
    } = body;

    // Validate required fields
    if (!name || !description || !price) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, description, and price are required",
        },
        { status: 400 }
      );
    }

    // Validate price
    if (price <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Price must be greater than 0",
        },
        { status: 400 }
      );
    }

    // Validate duration
    if (duration <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Duration must be greater than 0",
        },
        { status: 400 }
      );
    }

    // Create service with current schema
    const service = await prisma.service.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        imageUrl,
      },
    });

    // Add temporary fields for response
    const serviceWithExtras = {
      ...service,
      duration: parseInt(duration), // Will be stored in DB after schema update
      images: Array.isArray(images) ? images : [], // Will be stored in DB after schema update
      isActive: true, // Will be stored in DB after schema update
      categoryId: categoryId || null, // Will be stored in DB after schema update
      category: null, // Will be from DB after schema update
      staff: [], // Will be from DB after schema update
      timeSlots: [], // Will be from DB after schema update
    };

    return NextResponse.json(
      {
        success: true,
        data: serviceWithExtras,
        message: "Service created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Service creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create service",
      },
      { status: 500 }
    );
  }
}
