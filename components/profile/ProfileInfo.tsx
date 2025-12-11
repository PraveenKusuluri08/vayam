"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Edit2, Save, X, Camera } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
}

export default function ProfileInfo() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
  });

  useEffect(() => {
    fetchUserData();
  }, [session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsEditing(false);
        await fetchUserData();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-navy-900">Personal Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 text-gold-600 hover:text-gold-700 font-semibold border-2 border-gold-400 rounded-lg hover:bg-gold-50 transition-all"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "Saving..." : "Save"}</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                fetchUserData();
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Picture */}
      <div className="mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white text-3xl font-bold">
              {userData.name?.charAt(0).toUpperCase() || "U"}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center text-white hover:bg-gold-700 transition-all">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-navy-900">{userData.name || "User"}</h3>
            <p className="text-gray-600">{userData.email}</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              placeholder="Enter your full name"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{userData.name || "Not set"}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">{userData.email}</p>
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={userData.phone || ""}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              placeholder="Enter your phone number"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{userData.phone || "Not set"}</p>
          )}
        </div>

        {userData.createdAt && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Member Since
            </label>
            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">
              {new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

