"use client";

import { useState } from "react";
import { ScheduleSlot, Address, DeliverySpeed } from "@/types";
import { Calendar, Clock, MapPin, Plus, Zap, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useUserStore } from "@/store/userStore";

interface Step5ScheduleProps {
  schedule: ScheduleSlot;
  deliverySpeed: DeliverySpeed;
  address: Address;
  onChangeSchedule: (slot: ScheduleSlot) => void;
  onChangeDeliverySpeed: (speed: DeliverySpeed) => void;
  onChangeAddress: (address: Address) => void;
  onNext: () => void;
  onBack: () => void;
}

const TIME_SLOTS = [
  "10:00 AM – 01:00 PM (Morning)",
  "02:00 PM – 05:00 PM (Afternoon)",
  "06:00 PM – 08:30 PM (Evening)",
];

export default function Step5Schedule({
  schedule,
  deliverySpeed,
  address,
  onChangeSchedule,
  onChangeDeliverySpeed,
  onChangeAddress,
  onNext,
  onBack,
}: Step5ScheduleProps) {
  const { addresses, addAddress } = useUserStore();
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddr, setNewAddr] = useState<Partial<Address>>({
    name: "Home",
    street: "",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "",
    phone: "",
    isDefault: true,
  });

  // Generate next 6 available dates starting tomorrow
  const availableDates = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const dateStr = d.toISOString().split("T")[0];
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return { dateStr, dayName, monthDay, isToday: i === 0 };
  });

  const handleSaveNewAddress = (e: React.FormEvent) => {
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
      isDefault: true,
    };
    addAddress(created);
    onChangeAddress(created);
    setIsAddingNewAddress(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-[var(--foreground)]">
          Schedule Doorstep Tailor & Address
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
          Select when and where our master tailor should visit for measurements or fabric pickup.
        </p>
      </div>

      {/* 1. Date Selection */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--primary)]" />
          <span>1. Select Visit Date</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {availableDates.map((item) => {
            const isSel = schedule.date === item.dateStr || (!schedule.date && item.dateStr === availableDates[0].dateStr);
            return (
              <button
                type="button"
                key={item.dateStr}
                onClick={() => onChangeSchedule({ ...schedule, date: item.dateStr })}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isSel
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20"
                    : "border-[var(--border-subtle)] bg-surface-primary hover:border-[var(--border-strong)] text-[var(--foreground)]"
                }`}
              >
                <div className={`text-[10px] uppercase font-semibold ${isSel ? "text-white/80" : "text-[var(--muted-foreground)]"}`}>
                  {item.dayName}
                </div>
                <div className="text-sm font-extrabold mt-0.5">{item.monthDay}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Time Slot */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--primary)]" />
          <span>2. Select Time Window</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TIME_SLOTS.map((slot) => {
            const isSel = schedule.timeSlot === slot || (!schedule.timeSlot && slot === TIME_SLOTS[0]);
            return (
              <button
                type="button"
                key={slot}
                onClick={() => onChangeSchedule({ ...schedule, timeSlot: slot })}
                className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  isSel
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-bold ring-2 ring-[var(--primary)]/20"
                    : "border-[var(--border-subtle)] bg-surface-primary text-[var(--foreground)] hover:border-[var(--border-strong)]"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Delivery Speed */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block">
          3. Delivery Turnaround
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChangeDeliverySpeed("standard")}
            className={`p-4 rounded-xl border text-left transition-all ${
              deliverySpeed === "standard"
                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)] ring-2 ring-[var(--primary)]/20"
                : "border-[var(--border-subtle)] bg-surface-primary text-[var(--muted-foreground)]"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-[var(--foreground)]">Standard Delivery</span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase">Included Free</span>
            </div>
            <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
              Ready in 3 to 7 business days depending on garment complexity.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChangeDeliverySpeed("express")}
            className={`p-4 rounded-xl border text-left transition-all ${
              deliverySpeed === "express"
                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)] ring-2 ring-[var(--primary)]/20"
                : "border-[var(--border-subtle)] bg-surface-primary text-[var(--muted-foreground)]"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-[var(--foreground)] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Express Fast-Track
              </span>
              <span className="text-xs font-extrabold text-[var(--primary)]">+₹300</span>
            </div>
            <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
              Priority master cutter slot. Ready in 48 to 72 hours.
            </p>
          </button>
        </div>
      </div>

      {/* 4. Address Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--primary)]" />
            <span>4. Doorstep Visit & Delivery Address</span>
          </label>
          <button
            type="button"
            onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
            className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAddingNewAddress ? "Choose Saved" : "Add New Address"}</span>
          </button>
        </div>

        {!isAddingNewAddress ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addresses.map((addr) => {
              const isSel = address.id === addr.id;
              return (
                <div
                  key={addr.id}
                  onClick={() => onChangeAddress(addr)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    isSel
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 ring-2 ring-[var(--primary)]/20"
                      : "border-[var(--border-subtle)] bg-surface-primary hover:border-[var(--border-strong)]"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-[var(--foreground)]">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-secondary text-[var(--muted-foreground)]">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1.5 leading-snug">
                    {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                    Phone: {addr.phone}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleSaveNewAddress} className="p-4 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">Label</label>
                <input
                  type="text"
                  placeholder="e.g. Home, Office, Villa"
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-surface-primary border border-[var(--border-subtle)] text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">Contact Phone</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-surface-primary border border-[var(--border-subtle)] text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">Street Address / Landmark</label>
              <input
                type="text"
                required
                placeholder="Flat 402, Royal Palms, 12th Main"
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-surface-primary border border-[var(--border-subtle)] text-xs"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">City</label>
                <input
                  type="text"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-surface-primary border border-[var(--border-subtle)] text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">State</label>
                <input
                  type="text"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-surface-primary border border-[var(--border-subtle)] text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[var(--foreground)] block mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  placeholder="560038"
                  value={newAddr.pincode}
                  onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-surface-primary border border-[var(--border-subtle)] text-xs"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNewAddress(false)}
                className="px-3 py-1.5 rounded-lg border text-xs text-[var(--muted-foreground)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold"
              >
                Save & Use Address
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
        >
          <span>Next: Review & Confirm Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
