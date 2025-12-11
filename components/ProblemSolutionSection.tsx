"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export default function ProblemSolutionSection() {
  const problems = [
    "Limited financial impact",
    "No Emotional Connection",
    "Predictable & Uninspiring",
    "One-Size-Fits all approach",
    "Lack of differentiation",
    "Backward looking rewards",
  ];

  const solutions = [
    "A Smarter Alternative",
    "Tangible & Valuable",
    "Emotionally Impactful",
    "Innovative & Standout",
    "Aspirational & Motivating",
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problems Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">
            What is missing in today&apos;s{" "}
            <span className="text-gold-400">Incentivisation & Appreciation</span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-8">
            That maybe costing us business breakthrough?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((problem, index) => (
              <motion.div
                key={problem}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-4 bg-navy-800/50 rounded-lg border border-navy-700"
              >
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{problem}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-gold-600 to-gold-500 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-white">
            How do we make{" "}
            <span className="text-navy-900">Incentivisation & Appreciation</span>
          </h2>
          <p className="text-xl text-white/90 text-center mb-8">
            a lasting impression, emotionally & commercially?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
              >
                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">{solution}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
