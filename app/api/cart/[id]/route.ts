import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

// Helper to get session ID for guest users
function getSessionId() {
  const cookieStore = cookies();
  return cookieStore.get("cart_session_id")?.value;
}

// Helper to verify cart ownership
async function verifyCartAccess(cartId: string, userId?: string, sessionId?: string) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
  });

  if (!cart) {
    return false;
  }

  if (userId && cart.userId === userId) {
    return true;
  }

  if (sessionId && cart.sessionId === sessionId) {
    return true;
  }

  return false;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.email
      ? (await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } }))?.id
      : undefined;
    const sessionId = userId ? undefined : getSessionId();

    const body = await request.json();
    const { quantity } = body;

    if (quantity === undefined || quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    // Get cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: params.id },
      include: { cart: true },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    // Verify access
    const hasAccess = await verifyCartAccess(cartItem.cartId, userId, sessionId);
    if (!hasAccess) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Update quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: params.id },
      data: { quantity },
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

    return NextResponse.json({
      message: "Cart item updated",
      item: updatedItem,
    });
  } catch (error: any) {
    console.error("Error updating cart item:", error);
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
    const userId = session?.user?.email
      ? (await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } }))?.id
      : undefined;
    const sessionId = userId ? undefined : getSessionId();

    // Get cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: params.id },
      include: { cart: true },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    // Verify access
    const hasAccess = await verifyCartAccess(cartItem.cartId, userId, sessionId);
    if (!hasAccess) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error: any) {
    console.error("Error removing cart item:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

