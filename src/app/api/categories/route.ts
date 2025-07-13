import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

/**
 * Get all categories with search and filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type");
    const parentId = searchParams.get("parentId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Search functionality
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    // Filter by type if provided
    if (type) {
      where.type = type;
    }

    // Filter by parent category if provided
    if (parentId) {
      where.parentId = parentId;
    }

    // Get categories with pagination
    const [categories, totalCount] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          name: "asc",
        },
      }),
      prisma.category.count({ where }),
    ]);

    // Add extended fields until schema is updated
    const categoriesWithExtras = categories.map((category) => ({
      ...category,
      description: null, // Will be from DB after schema update
      type: type || "PRODUCT", // Will be from DB after schema update
      parentId: parentId || null, // Will be from DB after schema update
      parent: null, // Will be from DB after schema update
      children: [], // Will be from DB after schema update
      productCount: 0, // Will be calculated after schema update
      serviceCount: 0, // Will be calculated after schema update
      isActive: true, // Will be from DB after schema update
      createdAt: new Date(), // Will be from DB after schema update
      updatedAt: new Date(), // Will be from DB after schema update
    }));

    return NextResponse.json({
      success: true,
      data: categoriesWithExtras,
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
    console.error("Categories retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new category (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const { user, error } = await authMiddleware(request, ["ADMIN"]);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, type, parentId, imageUrl } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Category name is required",
        },
        { status: 400 }
      );
    }

    // Check if category with same name already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: { equals: name.trim(), mode: "insensitive" },
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          error: "Category with this name already exists",
        },
        { status: 409 }
      );
    }

    // Validate parent category exists if provided
    if (parentId) {
      const parentCategory = await prisma.category.findUnique({
        where: { id: parentId },
      });

      if (!parentCategory) {
        return NextResponse.json(
          {
            success: false,
            error: "Parent category not found",
          },
          { status: 404 }
        );
      }
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name: name.trim(),
      },
    });

    // Add extended fields for response
    const categoryWithExtras = {
      ...category,
      description: description?.trim() || null, // Will be stored in DB after schema update
      type: type || "PRODUCT", // Will be stored in DB after schema update
      parentId: parentId || null, // Will be stored in DB after schema update
      parent: null, // Will be from DB after schema update
      children: [], // Will be from DB after schema update
      imageUrl: imageUrl?.trim() || null, // Will be stored in DB after schema update
      productCount: 0, // Will be calculated after schema update
      serviceCount: 0, // Will be calculated after schema update
      isActive: true, // Will be stored in DB after schema update
      createdAt: new Date(), // Will be from DB after schema update
      updatedAt: new Date(), // Will be from DB after schema update
    };

    return NextResponse.json(
      {
        success: true,
        data: categoryWithExtras,
        message: "Category created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Category creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create category",
      },
      { status: 500 }
    );
  }
}
