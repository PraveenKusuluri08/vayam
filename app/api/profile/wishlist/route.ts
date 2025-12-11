import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
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

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
            inStock: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(wishlistItems);
  } catch (error: any) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Check if already in wishlist
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Product already in wishlist", item: existing },
        { status: 200 }
      );
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: user.id,
        productId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
            inStock: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Added to wishlist", item: wishlistItem },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

