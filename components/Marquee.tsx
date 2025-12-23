"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export default function Marquee({
  items,
  speed = 30,
  direction = "left",
  className = "",
}: MarqueeProps) {
  // Duplicate items multiple times for seamless loop
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap w-full ${className}`}>
      <motion.div
        className="flex items-center"
        animate={{
          x: direction === "left" ? ["0%", "-20%"] : ["-20%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{ display: "flex", alignItems: "center" }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="flex-shrink-0 inline-flex items-center px-8 text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap"
            style={{ lineHeight: "60px" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

