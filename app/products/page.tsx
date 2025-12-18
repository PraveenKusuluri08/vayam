"use client";

import { useState, useEffect } from "react";
import ProductGrid from "@/components/ProductGrid";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { Product } from "@/types/product";

const categories = [
  { id: "all", name: "All Products" },
  { id: "gold", name: "Gold" },
  { id: "diamond", name: "Diamond" },
  { id: "silver", name: "Silver" },
  { id: "custom", name: "Custom" },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
            All Products
          </h1>
          <div className="w-24 h-1 gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600">
            Explore our complete collection of premium rewards and incentives
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-navy-700" />
            <span className="font-semibold text-navy-900">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "gradient-gold text-white shadow-lg"
                    : "bg-gray-100 text-navy-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-2">
              {products.length === 0 
                ? "Products are being loaded. Please check back soon."
                : "No products found in this category."}
            </p>
            {selectedCategory !== "all" && products.length > 0 && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-gold-600 hover:text-gold-700 font-medium"
              >
                View all products
              </button>
            )}
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
