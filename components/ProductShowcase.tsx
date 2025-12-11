"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductGrid from "./ProductGrid";

export default function ProductShowcase() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
            The Precious Choices
          </h2>
          <div className="w-24 h-1 gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-xl text-navy-700 max-w-3xl mx-auto mb-4">
            Starts at ₹2,000. Premium products crafted with excellence.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
            You Imagine, We Create. At your Budget, Tailored to your needs!
          </p>
        </motion.div>

        <ProductGrid products={products} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Don&apos;t see what you&apos;re looking for?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-navy-900 text-white rounded-full font-semibold hover:bg-gold-600 transition-colors"
          >
            Request Custom Product
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
