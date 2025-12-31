"use client";

import Marquee from "./Marquee";

const promotionalItems = [
  "SALE • BUY 1 GET 1 FREE • BUY ANY 3 FOR ONLY ₹1299 • COUPON CODE: BUYTHREE",
];

export default function PromotionalBanner() {
  return (
    <div 
      className="fixed left-0 right-0 z-[55] bg-black text-white flex items-center border-b border-gray-800 h-[41px]"
      style={{
        position: 'fixed',
        top: '64px',
        left: '0',
        right: '0',
        width: '100%',
      }}
    >
      <Marquee items={promotionalItems} speed={25} direction="left" />
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .fixed.z-\\[55\\] {
            top: 80px !important;
          }
        }
      `}} />
    </div>
  );
}
