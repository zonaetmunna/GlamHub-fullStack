import { NextResponse } from "next/server";
import { createProduct, getAllProducts } from "../../../../prisma/product";

// post product api
export async function POST(req: Request, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const product = await createProduct(body);

    return NextResponse.json({
      product,
      message: "product added successfully",
    });
  } catch (error) {
    console.log("Product creation error:", error);

    return NextResponse.json({ message: "Internal server error" });
  }
}

// get products api
export async function GET(req: Request, res: NextResponse) {
  try {
    const products = await getAllProducts();
    return NextResponse.json({
      products,
      message: "product gets successfully",
    });
  } catch (error) {
    console.log("Product retrieval error:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
