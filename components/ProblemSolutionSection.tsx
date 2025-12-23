"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ProblemSolutionSection() {
  const solutions = [
    "A Smarter Alternative",
    "Tangible & Valuable",
    "Emotionally Impactful",
    "Innovative & Standout",
    "Aspirational & Motivating",
  ];

  return (
    <section className="py-10 md:py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 tracking-tight">
            Premium Corporate Gifting Solutions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
              >
                <Check className="w-4 h-4 text-gold-300 flex-shrink-0" />
                <span className="text-sm text-white">{solution}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
