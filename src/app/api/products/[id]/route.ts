import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

/**
 * Get specific product details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    // Get product by ID
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
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

    // Add extended fields until schema is updated
    const productWithExtras = {
      ...product,
      isFeatured: false, // Will be from DB after schema update
      isActive: true, // Will be from DB after schema update
      images: [], // Will be from DB after schema update
      averageRating: 0, // Will be calculated from reviews after schema update
      reviewCount: 0, // Will be calculated from reviews after schema update
      updatedAt: product.createdAt, // Will be from DB after schema update
    };

    return NextResponse.json({
      success: true,
      data: productWithExtras,
    });
  } catch (error) {
    console.error("Product retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}

/**
 * Update product (Admin only)
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

    const productId = params.id;
    const body = await request.json();
    const {
      name,
      description,
      price,
      imageUrl,
      images,
      stockCount,
      categoryId,
      isFeatured,
      isActive,
    } = body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
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

    // Validate stock count if provided
    if (stockCount !== undefined && stockCount < 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Stock count cannot be negative",
        },
        { status: 400 }
      );
    }

    // Check if category exists if provided
    if (categoryId) {
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
    }

    // Prepare update data
    const updateData: any = {};

    if (name) updateData.name = name.trim();
    if (description) updateData.description = description.trim();
    if (price !== undefined) updateData.price = parseFloat(price);
    if (imageUrl) updateData.imageUrl = imageUrl.trim();
    if (stockCount !== undefined) updateData.stockCount = parseInt(stockCount);
    if (categoryId) updateData.categoryId = categoryId;

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updateData,
      include: {
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Add extended fields for response
    const productWithExtras = {
      ...updatedProduct,
      isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : false, // Will be stored in DB after schema update
      isActive: isActive !== undefined ? Boolean(isActive) : true, // Will be stored in DB after schema update
      images: Array.isArray(images) ? images : [], // Will be stored in DB after schema update
      averageRating: 0, // Will be calculated from reviews after schema update
      reviewCount: 0, // Will be calculated from reviews after schema update
      updatedAt: new Date(), // Will be from DB after schema update
    };

    return NextResponse.json(
      {
        success: true,
        data: productWithExtras,
        message: "Product updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Product update error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update product",
      },
      { status: 500 }
    );
  }
}

/**
 * Delete product (Admin only)
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

    const productId = params.id;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    // Note: In production, you might want to check if product is in any orders
    // and prevent deletion or implement soft delete

    // Delete product
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Product deletion error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
