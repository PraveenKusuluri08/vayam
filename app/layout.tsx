import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PromotionalBanner from "@/components/PromotionalBanner";
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ErrorBoundary>
          <SessionProvider>
            <CartProvider>
              <WishlistProvider>
                <Navigation />
                <PromotionalBanner />
                <main className="min-h-screen pt-[145px] md:pt-[161px]">{children}</main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

