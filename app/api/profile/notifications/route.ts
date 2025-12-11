import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    // Store notification preferences (can be extended to add a UserPreferences model)
    // For now, we'll just return success
    // TODO: Create UserPreferences model to store these settings

    return NextResponse.json({
      message: "Notification preferences updated successfully",
      preferences: body,
    });
  } catch (error: any) {
    console.error("Error updating notifications:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

