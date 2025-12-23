"use client";

import Marquee from "./Marquee";

const promotionalItems = [
  "SALE • BUY 1 GET 1 FREE • BUY ANY 3 FOR ONLY ₹1299 • COUPON CODE: BUYTHREE",
];

export default function PromotionalBanner() {
  return (
    <div 
      className="promotional-banner-top fixed left-0 right-0 z-[55] bg-black text-white flex items-center border-b border-gray-800 h-[41px]"
    >
      <Marquee items={promotionalItems} speed={25} direction="left" />
      <style jsx global>{`
        .promotional-banner-top {
          position: fixed !important;
          top: 64px !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
        }
        @media (min-width: 768px) {
          .promotional-banner-top {
            top: 80px !important; /* md:h-20 = 80px for desktop navbar */
          }
        }
      `}</style>
    </div>
  );
}
