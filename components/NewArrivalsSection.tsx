"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NewArrivalsSectionProps {
  category: "gold" | "diamond" | "silver" | "custom";
  title: string;
}

export default function NewArrivalsSection({ category, title }: NewArrivalsSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?category=${category}`);
      if (response.ok) {
        const data = await response.json();
        let productsToShow = data.slice(0, 6) || [];
        
        // Duplicate products for gold and diamond to show more cards
        if ((category === "gold" || category === "diamond") && productsToShow.length > 0) {
          // Duplicate the products array 2-3 times to fill more space
          const duplicatedProducts = [];
          for (let i = 0; i < 3; i++) {
            productsToShow.forEach((product, idx) => {
              duplicatedProducts.push({
                ...product,
                id: `${product.id}-dup-${i}-${idx}`, // Unique ID for each duplicate
              });
            });
          }
          productsToShow = duplicatedProducts;
        }
        
        setProducts(productsToShow);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Determine card size based on category
  const isLargeCategory = category === "gold" || category === "diamond" || category === "silver";
  // Fewer columns = wider cards, more columns = narrower cards
  const gridCols = category === "gold" || category === "diamond"
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4" // 4 columns = wider cards
    : category === "silver"
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
  const gapSize = isLargeCategory ? "gap-6 sm:gap-7 md:gap-8 lg:gap-10" : "gap-5 sm:gap-6 md:gap-7";

  if (loading) {
    return (
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  // Determine if this is a premium category
  const isPremium = category === "gold" || category === "diamond" || category === "silver";
  
  return (
    <section className="py-12 md:py-16 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {isPremium && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className={`text-3xl md:text-4xl ${
                    category === "gold" ? "text-amber-600" :
                    category === "diamond" ? "text-purple-500" :
                    "text-gray-600"
                  }`}
                >
                  {category === "gold" ? "✨" : category === "diamond" ? "💎" : "⚪"}
                </motion.div>
              )}
              <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight ${
                isPremium 
                  ? category === "gold" ? "text-amber-900" :
                    category === "diamond" ? "text-purple-900" :
                    "text-gray-900"
                  : "text-gray-900"
              }`}>
                {title}
              </h2>
            </div>
            <Link
              href={`/categories/${category}`}
              className={`hidden md:flex items-center space-x-2 transition-colors font-semibold text-sm group px-4 py-2 rounded-md ${
                isPremium
                  ? category === "gold" ? "text-amber-900 bg-amber-50 hover:bg-amber-100 hover:text-amber-950" :
                    category === "diamond" ? "text-purple-900 bg-purple-50 hover:bg-purple-100 hover:text-purple-950" :
                    "text-gray-900 bg-gray-50 hover:bg-gray-100 hover:text-gray-950"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <span>View All</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </motion.div>

        <div className={`grid ${gridCols} ${gapSize}`}>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} isLarge={isLargeCategory} />
          ))}
        </div>

        <div className="text-center mt-6 md:hidden">
          <Link
            href={`/categories/${category}`}
            className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
