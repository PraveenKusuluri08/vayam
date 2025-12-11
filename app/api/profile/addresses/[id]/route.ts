import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify address belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: { id: params.id, userId: user.id },
    });

    if (!existingAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    const body = await request.json();
    const { isDefault } = body;

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true, id: { not: params.id } },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json({ message: "Address updated successfully", address });
  } catch (error: any) {
    console.error("Error updating address:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify address belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: { id: params.id, userId: user.id },
    });

    if (!existingAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    await prisma.address.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

