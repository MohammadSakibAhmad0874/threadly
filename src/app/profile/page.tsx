"use client";

import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Address, MeasurementProfile } from "@/types";
import {
  User,
  MapPin,
  Ruler,
  Plus,
  Trash2,
  Check,
  Save,
  ShieldCheck,
  Edit2,
  Clock,
  Scissors,
} from "lucide-react";

export default function ProfilePage() {
  const { user, addresses, updateUser, addAddress, removeAddress, setDefaultAddress, updateMeasurements } = useUserStore();

  const [activeTab, setActiveTab] = useState<"profile" | "measurements" | "addresses">("profile");

  // Personal Info Form State
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "Mohammad Sakib Ahmad",
    email: user?.email || "sakib@example.com",
    phone: user?.phone || "+91 98765 43210",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // Measurement Profile State
  const [measurements, setMeasurements] = useState<MeasurementProfile>(
    user?.measurements || {
      chest: 40,
      waist: 34,
      hip: 41,
      inseam: 32,
      shoulder: 18.5,
      sleeveLength: 25.5,
      neck: 16,
      notes: "Slight athletic taper. Prefers 0.5 inch extra ease in sleeve length.",
    }
  );
  const [measSaved, setMeasSaved] = useState(false);

  // Add Address Modal / State
  const [isAddingAddr, setIsAddingAddr] = useState(false);
  const [newAddr, setNewAddr] = useState<Partial<Address>>({
    name: "Home",
    street: "",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "",
    phone: user?.phone || "+91 98765 43210",
    isDefault: false,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(personalInfo);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSaveMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    updateMeasurements(measurements);
    setMeasSaved(true);
    setTimeout(() => setMeasSaved(false), 2500);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.pincode) return;
    const created: Address = {
      id: "addr-" + Date.now(),
      name: newAddr.name || "Home",
      street: newAddr.street || "",
      city: newAddr.city || "Bengaluru",
      state: newAddr.state || "Karnataka",
      pincode: newAddr.pincode || "",
      phone: newAddr.phone || "+91 98765 43210",
      isDefault: addresses.length === 0,
    };
    addAddress(created);
    setIsAddingAddr(false);
    setNewAddr({ name: "Office", street: "", city: "Bengaluru", state: "Karnataka", pincode: "", phone: user?.phone || "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
            Account & Measurement Vault
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
            Keep your contact details, body measurements, and doorstep delivery addresses up to date.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-secondary border border-[var(--border-subtle)]">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "profile"
                ? "bg-surface-primary text-[var(--foreground)] shadow-sm"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setActiveTab("measurements")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "measurements"
                ? "bg-surface-primary text-[var(--foreground)] shadow-sm"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Fit Profile
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "addresses"
                ? "bg-surface-primary text-[var(--foreground)] shadow-sm"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Addresses ({addresses.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Personal Info */}
      {activeTab === "profile" && (
        <div className="max-w-2xl rounded-3xl bg-surface-primary border border-[var(--border-subtle)] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center font-bold text-lg">
              {personalInfo.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--foreground)]">{personalInfo.name}</h3>
              <p className="text-xs text-[var(--muted-foreground)]">THREADLY Bespoke Member since 2026</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-[var(--foreground)] block mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--foreground)] block mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--foreground)] block mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              {profileSaved ? (
                <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Profile updated successfully
                </span>
              ) : <div />}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Measurements Profile */}
      {activeTab === "measurements" && (
        <div className="max-w-3xl rounded-3xl bg-surface-primary border border-[var(--border-subtle)] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--foreground)]">Digital Anatomical Dimensions</h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Calibrated by Master Tailor. Used for 1-click orders.
                </p>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
              Verified ✓
            </span>
          </div>

          <form onSubmit={handleSaveMeasurements} className="space-y-6 pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase block mb-1">
                  Chest (in)
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={measurements.chest || ""}
                  onChange={(e) => setMeasurements({ ...measurements, chest: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] font-bold focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase block mb-1">
                  Waist (in)
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={measurements.waist || ""}
                  onChange={(e) => setMeasurements({ ...measurements, waist: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] font-bold focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase block mb-1">
                  Hips (in)
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={measurements.hip || ""}
                  onChange={(e) => setMeasurements({ ...measurements, hip: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] font-bold focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase block mb-1">
                  Inseam (in)
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={measurements.inseam || ""}
                  onChange={(e) => setMeasurements({ ...measurements, inseam: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] font-bold focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase block mb-1">
                  Shoulder (in)
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={measurements.shoulder || ""}
                  onChange={(e) => setMeasurements({ ...measurements, shoulder: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] font-bold focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase block mb-1">
                  Sleeve (in)
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={measurements.sleeveLength || ""}
                  onChange={(e) => setMeasurements({ ...measurements, sleeveLength: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] font-bold focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase block mb-1">
                  Neck (in)
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={measurements.neck || ""}
                  onChange={(e) => setMeasurements({ ...measurements, neck: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] font-bold focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase block mb-1">
                Posture & Ease Preference Notes
              </label>
              <textarea
                rows={2}
                value={measurements.notes || ""}
                onChange={(e) => setMeasurements({ ...measurements, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              {measSaved ? (
                <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Measurements saved to vault
                </span>
              ) : <div />}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Measurements</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: Addresses CRUD */}
      {activeTab === "addresses" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[var(--foreground)]">Doorstep Pickup & Delivery Addresses</h3>
            <button
              onClick={() => setIsAddingAddr(!isAddingAddr)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Address</span>
            </button>
          </div>

          {/* New address form card */}
          {isAddingAddr && (
            <form onSubmit={handleAddAddress} className="p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-4 shadow-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">New Doorstep Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">Address Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Home, Penthouse, Office"
                    value={newAddr.name}
                    onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-[var(--border-subtle)] text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-[var(--border-subtle)] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="Flat 101, Prestige Palms, 12th Main Road"
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-[var(--border-subtle)] text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-[var(--border-subtle)] text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-[var(--border-subtle)] text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-[var(--border-subtle)] text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingAddr(false)}
                  className="px-4 py-2 rounded-lg border text-xs text-[var(--muted-foreground)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          {/* Addresses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-5 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--primary)]" />
                      <span className="font-bold text-sm text-[var(--foreground)]">{addr.name}</span>
                    </div>
                    {addr.isDefault ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold">
                        Default Address
                      </span>
                    ) : (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[11px] text-[var(--primary)] hover:underline"
                      >
                        Set as default
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                    Phone: {addr.phone}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-end">
                  {addresses.length > 1 && (
                    <button
                      onClick={() => removeAddress(addr.id)}
                      className="text-xs text-red-500 hover:text-red-600 inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
