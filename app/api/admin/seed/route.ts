import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { products } from "@/data/products";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

// Simple admin check - in production, use proper authentication
const ADMIN_SECRET = process.env.ADMIN_SEED_SECRET || "change-this-secret";

export async function POST(request: NextRequest) {
  try {
    // Check for admin secret in header or body
    const authHeader = request.headers.get("authorization");
    const body = await request.json().catch(() => ({}));
    const secret = authHeader?.replace("Bearer ", "") || body.secret;

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Seed Products
    console.log("Seeding products...");
    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: {
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.category.toUpperCase() as any,
          subcategory: product.subcategory,
          price: product.price,
          startingPrice: product.startingPrice,
          description: product.description,
          features: product.features || [],
          specifications: (product.specifications as any) || {},
          images: product.images || [],
          inStock: product.inStock !== undefined ? product.inStock : true,
          tags: product.tags || [],
          weight: product.weight,
          material: product.material,
          purity: product.purity,
        },
      });
    }
    console.log(`✅ Seeded ${products.length} products`);

    // Seed Admin User (if doesn't exist)
    const adminEmail = "admin@vayam.com";
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: "Admin User",
          password: hashedPassword,
          role: "ADMIN",
        },
      });
      console.log("Admin user created");
    }

    const productCount = await prisma.product.count();

    return NextResponse.json({
      message: "Database seeded successfully",
      productsSeeded: productCount,
    });
  } catch (error: any) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

