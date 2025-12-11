"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Lock, Bell, Shield, Trash2, Key } from "lucide-react";

export default function AccountSettings() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState<"password" | "notifications" | "privacy" | "delete">("password");
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    orderUpdates: true,
    promotions: false,
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        alert("Password changed successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const error = await response.json();
        alert(error.error || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/profile/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notifications),
      });

      if (response.ok) {
        alert("Notification preferences updated");
      } else {
        alert("Failed to update preferences");
      }
    } catch (error) {
      console.error("Error updating notifications:", error);
      alert("Failed to update preferences");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmText = "DELETE";
    const userInput = prompt(
      `This action cannot be undone. Type "${confirmText}" to confirm:`
    );

    if (userInput !== confirmText) {
      return;
    }

    if (!confirm("Are you absolutely sure? This will permanently delete your account and all data.")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/profile/delete", {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Account deleted. You will be signed out.");
        signOut({ callbackUrl: "/" });
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">Account Settings</h2>

      <div className="space-y-6">
        {/* Change Password */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-6 h-6 text-gold-600" />
            <h3 className="text-lg font-semibold text-navy-900">Change Password</h3>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 gradient-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-6 h-6 text-gold-600" />
            <h3 className="text-lg font-semibold text-navy-900">Notification Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-navy-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications({ ...notifications, email: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-navy-900">SMS Notifications</p>
                <p className="text-sm text-gray-600">Receive updates via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) =>
                    setNotifications({ ...notifications, sms: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-navy-900">Order Updates</p>
                <p className="text-sm text-gray-600">Get notified about order status</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.orderUpdates}
                  onChange={(e) =>
                    setNotifications({ ...notifications, orderUpdates: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-navy-900">Promotions & Offers</p>
                <p className="text-sm text-gray-600">Receive promotional emails</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.promotions}
                  onChange={(e) =>
                    setNotifications({ ...notifications, promotions: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
              </label>
            </div>
            <button
              onClick={handleNotificationUpdate}
              disabled={loading}
              className="px-6 py-2 gradient-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-gold-600" />
            <h3 className="text-lg font-semibold text-navy-900">Privacy & Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-navy-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gold-500 hover:text-gold-600 transition-all">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-navy-900">Login Activity</p>
                <p className="text-sm text-gray-600">View your recent login history</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gold-500 hover:text-gold-600 transition-all">
                View
              </button>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50">
          <div className="flex items-center space-x-3 mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
          </div>
          <p className="text-sm text-red-700 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={loading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

