"use client";

import Marquee from "./Marquee";

const offerItems = [
  "BUY 1 GET 1 FREE • Add any 2 products and get 1 for free",
  "Buy Any 3 for Only ₹1299 • Coupon Code: BUYTHREE",
  "FREE SHIPPING ON ALL ORDERS",
  "800K+ CUSTOMERS SERVED",
];

export default function AnimatedOffers() {
  return (
    <section className="py-4 md:py-6 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10">
        <Marquee 
          items={offerItems} 
          speed={30} 
          direction="left" 
          className="text-white font-semibold"
        />
      </div>
    </section>
  );
}

