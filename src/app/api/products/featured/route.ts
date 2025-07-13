import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

/**
 * Get featured products
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "8");

    // Get featured products
    const products = await prisma.product.findMany({
      // Note: isFeatured field will be available after schema update
      // For now, we'll return the latest products
      include: {
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    // Add temporary featured flag
    const featuredProducts = products.map((product) => ({
      ...product,
      isFeatured: true, // Will be from DB after schema update
      isActive: true, // Will be from DB after schema update
      images: [], // Will be from DB after schema update
      averageRating: 0, // Will be calculated from reviews after schema update
      reviewCount: 0, // Will be calculated from reviews after schema update
    }));

    return NextResponse.json({
      success: true,
      data: featuredProducts,
      message: "Featured products retrieved successfully",
    });
  } catch (error) {
    console.error("Featured products retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch featured products",
      },
      { status: 500 }
    );
  }
}
