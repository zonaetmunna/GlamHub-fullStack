import { Order } from "@prisma/client";
import prisma from "./prisma";

export interface CreateOrderData {
  userId: string;
  serviceIds: string[];
  total: number;
}

export async function createOrder(data: CreateOrderData): Promise<Order> {
  try {
    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        // Add other order-related fields here
      },
    });

    // Add logic to create order items and associate them with this order

    return order;
  } catch (error) {
    console.error("Order creation failed:", error);
    throw new Error("Order creation failed");
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        // Include related models if needed
      },
      where: {
        // Add any filtering conditions here
      },
    });

    return orders;
  } catch (error) {
    throw new Error("Failed to retrieve orders");
  }
}

// Implement other CRUD functions for orders here
