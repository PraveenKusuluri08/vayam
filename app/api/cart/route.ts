import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

// Helper to get or create cart
async function getOrCreateCart(userId?: string, sessionId?: string) {
  if (userId) {
    // User cart
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
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
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
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
          },
        },
      });
    }

    return cart;
  } else if (sessionId) {
    // Guest cart
    let cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
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
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { sessionId },
        include: {
          items: {
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
          },
        },
      });
    }

    return cart;
  }

  throw new Error("User ID or session ID required");
}

// Generate or get session ID for guest users
function getSessionId() {
  const cookieStore = cookies();
  let sessionId = cookieStore.get("cart_session_id")?.value;

  if (!sessionId) {
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    cookieStore.set("cart_session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return sessionId;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.email
      ? (await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } }))?.id
      : undefined;
    const sessionId = userId ? undefined : getSessionId();

    const cart = await getOrCreateCart(userId, sessionId);

    // Type definition for cart item with product
    type CartItemWithProduct = {
      id: string;
      product: {
        id: string;
        name: string;
        price: number;
        images: string[];
        slug: string;
        inStock: boolean;
      };
      quantity: number;
    };

    return NextResponse.json({
      id: cart.id,
      items: cart.items.map((item: CartItemWithProduct) => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: cart.items.reduce((sum: number, item: CartItemWithProduct) => sum + item.product.price * item.quantity, 0),
      itemCount: cart.items.reduce((sum: number, item: CartItemWithProduct) => sum + item.quantity, 0),
    });
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.email
      ? (await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } }))?.id
      : undefined;
    const sessionId = userId ? undefined : getSessionId();

    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Verify product exists - try by ID first, then by slug
    let product = await prisma.product.findUnique({
      where: { id: productId },
    });

    // If not found by ID, try finding by slug (in case productId is actually a slug)
    if (!product) {
      product = await prisma.product.findUnique({
        where: { slug: productId },
      });
    }

    if (!product) {
      console.error(`Product not found: ${productId}`);
      // List available products for debugging
      const allProducts = await prisma.product.findMany({
        select: { id: true, slug: true, name: true },
        take: 5,
      });
      console.log("Available products in database:", allProducts);
      return NextResponse.json(
        { 
          error: `Product not found: ${productId}. Please ensure products are seeded in the database.`,
          availableProducts: allProducts 
        },
        { status: 404 }
      );
    }

    if (!product.inStock) {
      return NextResponse.json(
        { error: "Product is out of stock" },
        { status: 400 }
      );
    }

    const cart = await getOrCreateCart(userId, sessionId);

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    let cartItem;
    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
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
    } else {
      // Create new item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
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
    }

    return NextResponse.json(
      { message: "Item added to cart", item: cartItem },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

