import { Category } from "@prisma/client";
import prisma from "./prisma";

interface CreateCategoryData {
  name: string;
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to retrieve categories");
  }
}

export async function createCategory(name: string): Promise<Category> {
  //
  try {
    if (!name) {
      throw new Error("Name field is required");
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
}

export async function updateCategory(
  id: string,
  data: CreateCategoryData
): Promise<Category> {
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data,
    });

    return updatedCategory;
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Failed to delete category");
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    return category;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw new Error("Failed to retrieve category by ID");
  }
}
