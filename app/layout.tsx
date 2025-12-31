import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// import PromotionalBanner from "@/components/PromotionalBanner";
import SessionProvider from "@/components/providers/SessionProvider";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vayam - Premium Rewards & Incentives in Gold, Diamond & Silver",
  description:
    "Vayam is your go-to partner for Premium Rewards and Incentives. We help you build deeper connections with your customers & top talents fostering engagements, commitments & loyalty.",
  keywords:
    "gold rewards, diamond incentives, silver products, corporate gifts, premium rewards, employee recognition, Vayam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${montserrat.variable}`} style={{ backgroundColor: '#FFFBF0', backgroundImage: 'linear-gradient(135deg, #FFFEF9 0%, #FFFBF0 25%, #FFF8E1 50%, #FFF3C4 75%, #FFECB3 100%)', backgroundAttachment: 'fixed', minHeight: '100vh' }}>
      <body style={{ backgroundColor: '#FFFBF0', backgroundImage: 'linear-gradient(135deg, #FFFEF9 0%, #FFFBF0 25%, #FFF8E1 50%, #FFF3C4 75%, #FFECB3 100%)', backgroundAttachment: 'fixed', minHeight: '100vh' }}>
        <div 
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#FFFBF0',
            backgroundImage: 'linear-gradient(135deg, #FFFEF9 0%, #FFFBF0 25%, #FFF8E1 50%, #FFF3C4 75%, #FFECB3 100%)',
            zIndex: -999,
            pointerEvents: 'none'
          }}
        />
        <ErrorBoundary>
          <SessionProvider>
            <CartProvider>
              <WishlistProvider>
                <Navigation />
                {/* <PromotionalBanner /> */}
                <main className="min-h-screen relative z-10 pt-[105px] md:pt-[121px] bg-transparent">{children}</main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

