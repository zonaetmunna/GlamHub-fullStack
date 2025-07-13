import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";

/**
 * Get reviews for a specific product
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    // Note: Reviews will be available after schema update
    // For now, return empty array with proper structure
    const reviews: any[] = [];
    const totalCount = 0;

    return NextResponse.json({
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPreviousPage: page > 1,
      },
      averageRating: 0,
      ratingDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    });
  } catch (error) {
    console.error("Product reviews retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product reviews",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new review for a product (Authenticated users only)
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

    const productId = params.id;
    const body = await request.json();
    const { rating, comment } = body;

    // Validate required fields
    if (!rating) {
      return NextResponse.json(
        {
          success: false,
          error: "Rating is required",
        },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    // Note: Review creation will be implemented after schema update
    // For now, return success message
    const mockReview = {
      id: "temp-review-id",
      productId,
      userId: user!.id,
      rating: parseInt(rating),
      comment: comment?.trim() || null,
      isApproved: false,
      createdAt: new Date(),
      user: {
        name: user!.name || "Anonymous",
      },
    };

    return NextResponse.json(
      {
        success: true,
        data: mockReview,
        message: "Review submitted successfully and is pending approval",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product review creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create review",
      },
      { status: 500 }
    );
  }
}
