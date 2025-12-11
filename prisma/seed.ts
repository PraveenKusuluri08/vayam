import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { products } from "../data/products";
import "dotenv/config";

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create adapter
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});

async function main() {
  console.log("🌱 Starting database seed...");

  // Seed Products
  console.log("📦 Seeding products...");
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
        features: product.features,
        specifications: (product.specifications || {}) as any,
        images: product.images,
        inStock: product.inStock,
        tags: product.tags,
        weight: product.weight,
        material: product.material,
        purity: product.purity,
      },
    });
  }
  console.log(`✅ Seeded ${products.length} products`);

  // Create a default admin user (password: admin123)
  console.log("👤 Creating default admin user...");
  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@vayam.com" },
    update: {},
    create: {
      email: "admin@vayam.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Created default admin user (admin@vayam.com / admin123)");

  console.log("🎉 Database seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

