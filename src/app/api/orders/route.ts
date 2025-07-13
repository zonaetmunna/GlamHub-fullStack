import { authMiddleware } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

/**
 * Get orders (authenticated users get their orders, admins get all orders)
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
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Regular users can only see their own orders
    if (user!.role !== "ADMIN") {
      where.userId = user!.id;
    }

    // Filter by status if provided
    if (status) {
      // Note: Status field will be properly typed after schema update
      where.status = status;
    }

    // Get orders with current schema
    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          products: {
            include: {
              Category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    // Add enhanced fields until schema is updated
    const ordersWithExtras = orders.map((order) => ({
      ...order,
      orderNumber: `ORD-${order.id.slice(-8).toUpperCase()}`, // Will be from DB after schema update
      items: order.products.map((product) => ({
        id: `item-${product.id}`,
        productId: product.id,
        product: product,
        quantity: 1, // Will be from OrderItem model after schema update
        price: product.price,
        createdAt: new Date(),
      })),
      totalAmount: order.products.reduce(
        (sum, product) => sum + product.price,
        0
      ),
      shippingAddress: "Will be from DB after schema update",
      billingAddress: "Will be from DB after schema update",
      paymentMethod: null,
      paymentStatus: "PENDING", // Will be from enum after schema update
      stripePaymentId: null,
      shippingCost: 0,
      discountCode: null,
      discountAmount: 0,
      notes: null,
      updatedAt: order.createdAt,
    }));

    return NextResponse.json({
      success: true,
      data: ordersWithExtras,
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
    console.error("Orders retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new order (Authenticated users only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { user, error } = await authMiddleware(request);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const body = await request.json();
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      discountCode,
      notes,
    } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Items are required",
        },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        {
          success: false,
          error: "Shipping address is required",
        },
        { status: 400 }
      );
    }

    // Validate items and calculate total
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Each item must have a valid productId and quantity",
          },
          { status: 400 }
        );
      }

      // Check if product exists and has sufficient stock
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: `Product with ID ${item.productId} not found`,
          },
          { status: 404 }
        );
      }

      if (product.stockCount < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            error: `Insufficient stock for product ${product.name}. Available: ${product.stockCount}, Requested: ${item.quantity}`,
          },
          { status: 400 }
        );
      }

      validatedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    // Apply discount if provided
    let discountAmount = 0;
    if (discountCode) {
      // Simple discount logic - 10% off for "WELCOME10"
      if (discountCode === "WELCOME10") {
        discountAmount = totalAmount * 0.1;
      }
    }

    const shippingCost = totalAmount > 100 ? 0 : 10; // Free shipping over $100
    const finalTotal = totalAmount - discountAmount + shippingCost;

    // Create order with current schema (simplified)
    const order = await prisma.order.create({
      data: {
        userId: user!.id,
        status: "pending", // Will use enum after schema update
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Add enhanced fields for response
    const orderWithExtras = {
      ...order,
      orderNumber: `ORD-${order.id.slice(-8).toUpperCase()}`,
      items: validatedItems.map((item, index) => ({
        id: `item-${index}`,
        ...item,
        createdAt: new Date(),
      })),
      totalAmount: finalTotal,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod: paymentMethod || null,
      paymentStatus: "PENDING",
      stripePaymentId: null,
      shippingCost,
      discountCode: discountCode || null,
      discountAmount,
      notes: notes || null,
      updatedAt: order.createdAt,
    };

    // Note: In the complete implementation, you would:
    // 1. Create Stripe payment intent here
    // 2. Update product stock counts
    // 3. Create OrderItem records
    // 4. Send order confirmation email

    return NextResponse.json(
      {
        success: true,
        data: orderWithExtras,
        message: "Order created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 }
    );
  }
}
