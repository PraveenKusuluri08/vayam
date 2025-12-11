"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  Lock,
  ShoppingBag,
  Edit2,
  Plus,
  Trash2,
  Check,
  X,
} from "lucide-react";
import ProfileInfo from "@/components/profile/ProfileInfo";
import AddressesSection from "@/components/profile/AddressesSection";
import OrdersSection from "@/components/profile/OrdersSection";
import WishlistSection from "@/components/profile/WishlistSection";
import AccountSettings from "@/components/profile/AccountSettings";

type TabType = "profile" | "orders" | "addresses" | "wishlist" | "settings";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "orders" as TabType, label: "Orders", icon: ShoppingBag },
    { id: "addresses" as TabType, label: "Addresses", icon: MapPin },
    { id: "wishlist" as TabType, label: "Wishlist", icon: Heart },
    { id: "settings" as TabType, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-2">
            My Account
          </h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? "bg-gold-50 text-gold-700 font-semibold border-2 border-gold-300"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-md p-6 md:p-8"
            >
              {activeTab === "profile" && <ProfileInfo />}
              {activeTab === "orders" && <OrdersSection />}
              {activeTab === "addresses" && <AddressesSection />}
              {activeTab === "wishlist" && <WishlistSection />}
              {activeTab === "settings" && <AccountSettings />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

