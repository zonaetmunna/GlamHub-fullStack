import { NextRequest, NextResponse } from "next/server";

/**
 * Handle user logout
 */
export async function POST(request: NextRequest) {
  try {
    // Clear the authentication cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successful",
      },
      { status: 200 }
    );

    console.log("response", response);

    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during logout. Please try again.",
      },
      { status: 500 }
    );
  }
}
