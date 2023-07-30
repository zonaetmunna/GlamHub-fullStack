import { NextResponse } from "next/server";
import { createCategory, getAllCategories } from "../../../../prisma/category";

export async function GET(req: Request, res: NextResponse) {
  try {
    const categories = await getAllCategories();
    return NextResponse.json({
      categories,
      message: "categories gets successfully",
    });
  } catch (error) {
    console.log("Category retrieval error:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;
    console.log(name);
    if (!name) {
      return NextResponse.json({
        message: "Name field is required",
      });
    }
    const category = await createCategory(name);
    console.log(category);
    return NextResponse.json({
      category,
      message: "category added successfully",
    });
  } catch (error) {
    console.log("Category creation error:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
