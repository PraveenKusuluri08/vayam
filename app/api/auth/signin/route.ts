import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

/**
 * Sign In API Route
 * 
 * This endpoint validates user credentials.
 * For session creation, use NextAuth's signin endpoint at /api/auth/signin
 * or use the signIn() function from next-auth/react in the frontend.
 * 
 * POST /api/auth/signin
 * Body: { email: string, password: string }
 * 
 * Returns: { message: string, user: { id, name, email, role } }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return user data (without password)
    return NextResponse.json(
      {
        message: "Sign in successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        // Note: For session creation, use NextAuth's signin endpoint
        // or signIn() from next-auth/react
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

