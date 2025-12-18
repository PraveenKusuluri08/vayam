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
  speed = 25,
  direction = "left",
  className = "",
}: MarqueeProps) {
  // Duplicate items multiple times for seamless loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap w-full h-full ${className}`}>
      <motion.div
        className="flex items-center h-full"
        animate={{
          x: direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"],
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
            className="flex-shrink-0 inline-flex items-center h-full px-6 text-xs font-bold uppercase tracking-wider"
            style={{ lineHeight: "41px" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

