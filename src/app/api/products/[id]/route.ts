import { NextResponse } from "next/server";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../../../../prisma/product";

export async function GET(req: Request, res: NextResponse) {
  try {
    const id = req.url.split("/products/")[1];
    const product = await getProductById(id);

    return NextResponse.json({
      product,
      message: "Product retrieved successfully",
    });
  } catch (error) {
    console.log("Product retrieval error:", error);

    return NextResponse.json({ message: "Internal server error" });
  }
}

export async function PUT(req: Request, res: NextResponse) {
  const id = req.url.split("/products/")[1];
  console.log(id);

  try {
    const body = await req.json();
    console.log(body);

    const updatedProduct = await updateProduct(id, body);

    return NextResponse.json({
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log("Product update error:", error);

    return NextResponse.json({ message: "Internal server error" });
  }
}

export async function DELETE(
  req: Request,
  res: NextResponse
  //   { params }: { params: { id: string } }
) {
  //   const { id } = params;
  const id = req.url.split("/products/")[1];

  try {
    await deleteProduct(id);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Product deletion error:", error);

    return NextResponse.json({ message: "Internal server error" });
  }
}
