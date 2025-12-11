import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try to find by ID first
    let product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    // If not found, try by slug
    if (!product) {
      product = await prisma.product.findUnique({
        where: { slug: params.id },
      });
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Transform to match frontend Product type
    const transformedProduct = {
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
    };

    return NextResponse.json(transformedProduct);
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

