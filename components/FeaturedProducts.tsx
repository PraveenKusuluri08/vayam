"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Star, TrendingUp } from "lucide-react";
import { Product } from "@/types/product";

export default function FeaturedProducts() {
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
        setProducts(data || []);
      } else {
        console.error("Failed to fetch products");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="products" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-8 h-8 text-gold-500 fill-gold-500" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900">
              The Precious Choices
            </h2>
            <Star className="w-8 h-8 text-gold-500 fill-gold-500" />
          </div>
          <div className="w-32 h-1 gradient-gold mx-auto mb-6 rounded-full" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-navy-700 max-w-3xl mx-auto mb-2"
          >
            Starts at ₹2,000. Premium products crafted with excellence.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto italic"
          >
            You Imagine, We Create. At your Budget, Tailored to your needs!
          </motion.p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available at the moment.</p>
            <p className="text-sm text-gray-500 mt-2">
              Please run <code className="bg-gray-100 px-2 py-1 rounded">npm run db:seed</code> to seed products.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4 text-lg">
            Don&apos;t see what you&apos;re looking for?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 gradient-gold text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 mx-auto"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Request Custom Product</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
