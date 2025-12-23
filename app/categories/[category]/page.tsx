"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import { motion } from "framer-motion";

const categoryNames: Record<string, string> = {
  gold: "Gold Products",
  diamond: "Diamond Products",
  silver: "Silver Products",
  custom: "Custom Products",
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const categoryProducts = products.filter(
    (p) => p.category === category
  );

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
            {categoryNames[category] || "Products"}
          </h1>
          <div className="w-24 h-1 gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600">
            {categoryProducts.length} premium {category} products available
          </p>
        </motion.div>

        {categoryProducts.length > 0 ? (
          <ProductGrid products={categoryProducts} />
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}





