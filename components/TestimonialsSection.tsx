"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Tech Solutions Pvt. Ltd.",
    role: "CEO",
    content: "Vayam helped us create meaningful rewards for our top performers. The gold pendants were beautifully crafted and our employees were thrilled!",
    rating: 5,
    image: "👨‍💼",
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "Global Enterprises",
    role: "HR Director",
    content: "The customized logo pendants strengthened our brand loyalty. Excellent quality and service from order to delivery. Highly recommended!",
    rating: 5,
    image: "👩‍💼",
  },
  {
    id: 3,
    name: "Amit Patel",
    company: "Retail Chain India",
    role: "Operations Manager",
    content: "We ordered silver dinnerware sets for our dealer appreciation event. The products exceeded expectations and delivery was seamless.",
    rating: 5,
    image: "👨‍💻",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gold-50 via-white to-silver-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-xl text-navy-700 max-w-2xl mx-auto">
            Trusted by leading businesses across India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gold-500 fill-gold-500"
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-gold-300" />
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-navy-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

