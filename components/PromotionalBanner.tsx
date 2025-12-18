"use client";

import { useState, useEffect } from "react";
import Marquee from "./Marquee";
import { motion, AnimatePresence } from "framer-motion";

const promotionalItems = [
  "LAUNCH EDIT · FESTIVE JEWELLERY & CORPORATE GIFTING",
  "BUY 2 PIECES · GET 10% OFF ON 3RD*",
  "FREE PAN‑INDIA SHIPPING ON ALL PREPAID ORDERS",
  "100% HALLMARKED GOLD · CERTIFIED DIAMONDS",
  "LIGHTWEIGHT EVERYDAY DESIGNS · PERFECT FOR WORK & OCCASIONS",
  "CUSTOM LOGO JEWELLERY & BULK CORPORATE SOLUTIONS",
];

export default function PromotionalBanner() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {!isScrolled && (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: -41, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 right-0 top-16 md:top-20 z-[40] bg-gold-500 text-white flex items-center"
          style={{ 
            height: "41px"
          }}
        >
          <Marquee items={promotionalItems} speed={25} direction="left" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
