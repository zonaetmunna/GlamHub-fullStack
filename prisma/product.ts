import { Product } from "@prisma/client";
import prisma from "./prisma";

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  categoryId?: string; // Optional field for category association
}

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database Connection Unsuccessull");
  }
}
export async function createProduct(data: CreateProductData): Promise<Product> {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        // Use 'connect' if categoryId is provided, otherwise leave it undefined
        ...(data.categoryId
          ? { Category: { connect: { id: data.categoryId } } }
          : {}),
      },
    });

    return product;
  } catch (error) {
    console.error("Product creation failed:", error);
    throw new Error("Product creation failed");
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    // Use the Prisma client to find many products and include the associated category
    const products = await prisma.product.findMany({
      include: {
        Category: true, // Use 'Category' instead of 'category'
      },
    });

    return products; // Return the array of products with their associated categories
  } catch (error) {
    throw new Error("Failed to retrieve products");
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        Category: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    throw new Error("Failed to retrieve product");
  }
}

export async function updateProduct(
  id: string,
  data: Partial<CreateProductData>
): Promise<Product> {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data,
    });

    return updatedProduct;
  } catch (error) {
    throw new Error("Product update failed");
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error("Product deletion failed");
  }
}
