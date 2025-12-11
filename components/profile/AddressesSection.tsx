"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Edit2, Trash2, Check, X } from "lucide-react";

interface Address {
  id: string;
  type: "SHIPPING" | "BILLING" | "BOTH";
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesSection() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Address>>({
    type: "SHIPPING",
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/profile/addresses");
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId
        ? `/api/profile/addresses/${editingId}`
        : "/api/profile/addresses";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsAdding(false);
        setEditingId(null);
        resetForm();
        await fetchAddresses();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const response = await fetch(`/api/profile/addresses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchAddresses();
      } else {
        alert("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address");
    }
  };

  const resetForm = () => {
    setFormData({
      type: "SHIPPING",
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      isDefault: false,
    });
  };

  const startEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData(address);
    setIsAdding(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-navy-900">My Addresses</h2>
        {!isAdding && (
          <button
            onClick={() => {
              setIsAdding(true);
              resetForm();
              setEditingId(null);
            }}
            className="flex items-center space-x-2 px-4 py-2 gradient-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Address</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 bg-gray-50 rounded-xl border-2 border-gold-200"
        >
          <h3 className="text-lg font-semibold text-navy-900 mb-4">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                >
                  <option value="SHIPPING">Shipping</option>
                  <option value="BILLING">Billing</option>
                  <option value="BOTH">Both</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1 *
              </label>
              <input
                type="text"
                required
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                value={formData.addressLine2 || ""}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
              />
              <label htmlFor="isDefault" className="text-sm text-gray-700">
                Set as default address
              </label>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 gradient-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : editingId ? "Update Address" : "Add Address"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  resetForm();
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Addresses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length === 0 && !isAdding ? (
          <div className="col-span-2 text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No addresses saved yet</p>
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-2 gradient-gold text-white rounded-lg font-semibold"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          addresses.map((address) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-gold-300 transition-all relative"
            >
              {address.isDefault && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full">
                  Default
                </span>
              )}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-navy-900">{address.fullName}</h4>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {address.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{address.phone}</p>
              </div>
              <div className="text-sm text-gray-700 mb-4">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(address)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:border-gold-500 hover:text-gold-600 transition-all"
                >
                  <Edit2 className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

