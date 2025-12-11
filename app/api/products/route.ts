import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const inStock = searchParams.get("inStock");

    const where: any = {};
    
    if (category && category !== "all") {
      where.category = category.toUpperCase();
    }

    if (inStock === "true") {
      where.inStock = true;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Transform to match frontend Product type
    const transformedProducts = products.map((product: {
      id: string;
      slug: string;
      name: string;
      category: string;
      subcategory: string;
      price: number;
      startingPrice: number | null;
      description: string;
      features: string[];
      specifications: any;
      images: string[];
      inStock: boolean;
      tags: string[];
      weight: string | null;
      material: string | null;
      purity: string | null;
    }) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category.toLowerCase(),
      subcategory: product.subcategory,
      price: product.price,
      startingPrice: product.startingPrice,
      description: product.description,
      features: product.features || [],
      specifications: product.specifications || {},
      images: product.images || [],
      inStock: product.inStock,
      tags: product.tags || [],
      weight: product.weight,
      material: product.material,
      purity: product.purity,
    }));

    return NextResponse.json(transformedProducts);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

