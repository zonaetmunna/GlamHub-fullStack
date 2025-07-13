import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

/**
 * Get products with search, filter, and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const isFeatured = searchParams.get("featured") === "true";
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

    // Category filter
    if (category) {
      where.categoryId = category;
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

    // Get products with related data
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    // Add temporary fields until schema is updated
    const productsWithExtras = products.map((product) => ({
      ...product,
      isFeatured: false, // Will be from DB after schema update
      isActive: true, // Will be from DB after schema update
      images: [], // Will be from DB after schema update
      averageRating: 0, // Will be calculated from reviews after schema update
      reviewCount: 0, // Will be calculated from reviews after schema update
    }));

    return NextResponse.json({
      success: true,
      data: productsWithExtras,
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
    console.error("Product retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new product (Admin only)
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
      imageUrl,
      images = [],
      stockCount,
      categoryId,
      isFeatured = false,
    } = body;

    // Validate required fields
    if (!name || !description || !price || !stockCount || !categoryId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Name, description, price, stock count, and category are required",
        },
        { status: 400 }
      );
    }

    // Validate price and stock
    if (price <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Price must be greater than 0",
        },
        { status: 400 }
      );
    }

    if (stockCount < 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Stock count cannot be negative",
        },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: "Category not found",
        },
        { status: 404 }
      );
    }

    // Create product with current schema
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        imageUrl,
        stockCount: parseInt(stockCount),
        categoryId,
      },
      include: {
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Add temporary fields for response
    const productWithExtras = {
      ...product,
      isFeatured: Boolean(isFeatured), // Will be stored in DB after schema update
      isActive: true, // Will be stored in DB after schema update
      images: Array.isArray(images) ? images : [], // Will be stored in DB after schema update
    };

    return NextResponse.json(
      {
        success: true,
        data: productWithExtras,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create product",
      },
      { status: 500 }
    );
  }
}
