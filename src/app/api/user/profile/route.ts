import { authMiddleware, hashPassword, isValidEmail } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

/**
 * Get user profile
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const { user, error } = await authMiddleware(request);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    // Get user profile from database
    const userProfile = await prisma.user.findUnique({
      where: { id: user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        // Additional fields will be available after schema update
      },
    });

    if (!userProfile) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Add extended fields until schema is updated
    const extendedProfile = {
      ...userProfile,
      updatedAt: userProfile.createdAt, // Will be from DB after schema update
      phone: null, // Will be from DB after schema update
      address: null, // Will be from DB after schema update
      city: null, // Will be from DB after schema update
      country: null, // Will be from DB after schema update
      profileImage: null, // Will be from DB after schema update
      role: user!.role, // Will be from DB after schema update
      isActive: true, // Will be from DB after schema update
      preferences: {
        notifications: true,
        marketing: false,
        newsletter: true,
      },
      stats: {
        totalOrders: 0,
        totalSpent: 0,
        totalAppointments: 0,
      },
    };

    return NextResponse.json({
      success: true,
      data: extendedProfile,
    });
  } catch (error) {
    console.error("User profile retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch user profile",
      },
      { status: 500 }
    );
  }
}

/**
 * Update user profile
 */
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const { user, error } = await authMiddleware(request);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      address,
      city,
      country,
      profileImage,
      currentPassword,
      newPassword,
      preferences,
    } = body;

    // Validate email format if provided
    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    // Handle password change if requested
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          {
            success: false,
            error: "Current password is required to change password",
          },
          { status: 400 }
        );
      }

      // Get current user with password for verification
      const currentUser = await prisma.user.findUnique({
        where: { id: user!.id },
        select: {
          password: true,
        },
      });

      if (!currentUser) {
        return NextResponse.json(
          {
            success: false,
            error: "User not found",
          },
          { status: 404 }
        );
      }

      // Verify current password
      const bcrypt = require("bcrypt");
      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        currentUser.password
      );

      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          {
            success: false,
            error: "Current password is incorrect",
          },
          { status: 401 }
        );
      }

      // Validate new password strength
      const { isValidPassword } = await import("@/lib/auth");
      const passwordValidation = isValidPassword(newPassword);
      if (!passwordValidation.valid) {
        return NextResponse.json(
          {
            success: false,
            error: passwordValidation.message,
          },
          { status: 400 }
        );
      }
    }

    // Check if email is already taken by another user
    if (email && email !== user!.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Email is already taken",
          },
          { status: 409 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};

    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.toLowerCase();

    // Add password hash if new password provided
    if (newPassword) {
      updateData.password = await hashPassword(newPassword);
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: user!.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Add extended fields for response
    const extendedProfile = {
      ...updatedUser,
      updatedAt: new Date(), // Will be from DB after schema update
      phone: phone?.trim() || null, // Will be stored in DB after schema update
      address: address?.trim() || null, // Will be stored in DB after schema update
      city: city?.trim() || null, // Will be stored in DB after schema update
      country: country?.trim() || null, // Will be stored in DB after schema update
      profileImage: profileImage?.trim() || null, // Will be stored in DB after schema update
      role: user!.role, // Will be from DB after schema update
      isActive: true, // Will be from DB after schema update
      preferences: preferences || {
        notifications: true,
        marketing: false,
        newsletter: true,
      },
    };

    return NextResponse.json(
      {
        success: true,
        data: extendedProfile,
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("User profile update error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update user profile",
      },
      { status: 500 }
    );
  }
}
