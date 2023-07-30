import { NextResponse } from "next/server";

import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../../../../../prisma/category";

interface UpdateCategoryData {
  name: string;
}

export async function GET(req: Request, res: NextResponse) {
  const id = req.url.split("/categories/")[1];

  try {
    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json({ message: "Category not found" });
    }

    return NextResponse.json({
      category,
      message: "Category fetched successfully",
    });
  } catch (error) {
    console.error("Category retrieval error:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}

export async function PUT(req: Request, res: NextResponse) {
  const id = req.url.split("/categories/")[1];

  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ message: "Name field is required" });
    }

    const updatedCategory = await updateCategory(id, body);

    return NextResponse.json({
      category: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Category update error:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
export async function DELETE(req: Request, res: NextResponse) {
  const id = req.url.split("/categories/")[1];

  try {
    await deleteCategory(id);
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Category deletion error:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
