"use client";

import { BookingFormData } from "@/types";
import { CATALOG_ITEMS } from "@/components/landing/GarmentCatalog";
import { calculateOrderPricing } from "@/lib/orderUtils";
import { ShieldCheck, Calendar, Clock, MapPin, Scissors, Ruler, Layers, ArrowLeft, Check, Zap } from "lucide-react";

interface Step6ReviewProps {
  data: BookingFormData;
  onConfirm: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export default function Step6Review({
  data,
  onConfirm,
  onBack,
  isSubmitting = false,
}: Step6ReviewProps) {
  const item = CATALOG_ITEMS.find((c) => c.id === data.garment) || CATALOG_ITEMS[0];
  const pricing = calculateOrderPricing(data);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-[var(--foreground)]">
          Review Your Order
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
          Review the details before confirming your master tailor doorstep appointment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Summary of specifications */}
        <div className="lg:col-span-7 space-y-4">
          {/* Garment & Customization card */}
          <div className="p-5 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">
                    {item.name} × {data.quantity}
                  </h3>
                  <span className="text-[11px] text-[var(--primary)] font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-[var(--foreground)]">
                ₹{pricing.stitchingFee}
              </span>
            </div>

            {/* Customization pills */}
            <div className="space-y-2 text-xs">
              <div className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase">
                Custom Tailoring Specifications
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-surface-secondary">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Fit</span>
                  <span className="font-semibold text-[var(--foreground)]">{data.customizations.fit || "Slim Fit"}</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-secondary">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Collar</span>
                  <span className="font-semibold text-[var(--foreground)]">{data.customizations.collar || "Cutaway Collar"}</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-secondary">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Cuffs</span>
                  <span className="font-semibold text-[var(--foreground)]">{data.customizations.cuff || "Rounded Single Button"}</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-secondary">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Pockets</span>
                  <span className="font-semibold text-[var(--foreground)]">{data.customizations.pockets || "Clean No Pocket"}</span>
                </div>
              </div>

              {data.customizations.monogram && (
                <div className="p-2 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex justify-between items-center text-xs">
                  <span className="text-[var(--primary)] font-semibold">Embroidered Monogram</span>
                  <span className="font-mono font-bold tracking-widest text-[var(--primary)]">"{data.customizations.monogram}"</span>
                </div>
              )}

              {data.customizations.specialNotes && (
                <div className="p-2 rounded-lg bg-surface-secondary text-[11px] text-[var(--muted-foreground)] italic">
                  Note: "{data.customizations.specialNotes}"
                </div>
              )}
            </div>
          </div>

          {/* Measurement & Fabric info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-primary border border-[var(--border-subtle)] space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                <Ruler className="w-4 h-4" />
                <span>Measurement Method</span>
              </div>
              <div className="font-semibold text-[var(--foreground)]">
                {data.measurementMethod === "doorstep_tailor"
                  ? "Doorstep Master Tailor Visit"
                  : data.measurementMethod === "sample_garment"
                  ? "Hand Over Sample Garment"
                  : "Saved Fit Profile"}
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                {data.measurementMethod === "doorstep_tailor"
                  ? "14 body checkpoints mapped at home"
                  : data.measurementMethod === "sample_garment"
                  ? "Digital laser cloning of reference piece"
                  : "Calibrated to your stored profile"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-primary border border-[var(--border-subtle)] space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold">
                <Layers className="w-4 h-4" />
                <span>Fabric Arrangement</span>
              </div>
              <div className="font-semibold text-[var(--foreground)]">
                {data.fabric.type === "provide_own" ? "Providing Own Fabric" : "Sourcing via Threadly"}
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                {data.fabric.material || (data.fabric.type === "provide_own" ? "Handover during appointment" : "Curated mill cloth")}
              </p>
            </div>
          </div>

          {/* Appointment & Address card */}
          <div className="p-4 rounded-xl bg-surface-primary border border-[var(--border-subtle)] space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[var(--foreground)] font-bold">
                <Calendar className="w-4 h-4 text-[var(--primary)]" />
                <span>Tailor Visit: {data.schedule.date}</span>
              </div>
              <span className="text-[11px] text-[var(--muted-foreground)]">
                {data.schedule.timeSlot}
              </span>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t border-[var(--border-subtle)]">
              <MapPin className="w-4 h-4 text-[var(--muted-foreground)] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[var(--foreground)]">{data.address.name}</span>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                  {data.address.street}, {data.address.city}, {data.address.state} - {data.address.pincode}
                </p>
                <span className="text-[10px] text-[var(--muted-foreground)]">Phone: {data.address.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Receipt & Confirmation */}
        <div className="lg:col-span-5 rounded-2xl bg-surface-secondary border border-[var(--border-subtle)] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <span className="text-xs font-mono font-semibold text-[var(--muted-foreground)]">ORDER BREAKDOWN</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold">
              Tax Included
            </span>
          </div>

          {/* Items */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--muted-foreground)]">{item.name} (×{data.quantity})</span>
              <span className="font-semibold text-[var(--foreground)]">₹{pricing.stitchingFee}</span>
            </div>

            {pricing.fabricFee > 0 && (
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Mill Fabric ({data.fabric.material})</span>
                <span className="font-semibold text-[var(--foreground)]">₹{pricing.fabricFee}</span>
              </div>
            )}

            {pricing.expressFee > 0 && (
              <div className="flex justify-between text-amber-500 font-medium">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Express 48h Fast-Track
                </span>
                <span>₹{pricing.expressFee}</span>
              </div>
            )}

            {pricing.monogramFee > 0 && (
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Custom Monogram Embroidery</span>
                <span className="font-semibold text-[var(--foreground)]">₹{pricing.monogramFee}</span>
              </div>
            )}

            <div className="flex justify-between text-emerald-500">
              <span>Doorstep Master Tailor Visit</span>
              <span className="font-semibold line-through text-[var(--muted-foreground)] opacity-70 mr-1">₹199</span>
              <span className="font-semibold">FREE</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="border-t border-[var(--border-subtle)] pt-4 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-[var(--foreground)]">Total Amount</span>
              <span className="text-3xl font-black text-[var(--primary)]">₹{pricing.total}</span>
            </div>
            <div className="text-[11px] text-[var(--muted-foreground)] flex items-center justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-semibold text-[var(--foreground)]">
                {data.deliverySpeed === "express" ? "Within 48–72 Hours" : `${item.deliveryDays} Business Days`}
              </span>
            </div>
          </div>

          {/* Guarantee Badge */}
          <div className="p-3 rounded-xl bg-surface-primary border border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--foreground)]">
            <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div className="text-[11px] text-[var(--muted-foreground)]">
              Backed by our <strong className="text-[var(--foreground)]">100% Free Fit Guarantee</strong>. Free alterations within 7 days.
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirm}
            className="w-full py-4 px-6 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold text-sm shadow-xl shadow-[var(--primary)]/25 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>Confirm & Schedule Tailor</span>
              </>
            )}
          </button>

          <div className="text-center text-[10px] text-[var(--muted-foreground)]">
            Pay upon tailor visit or delivery (Cash / UPI / Cards accepted)
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="pt-4 border-t border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Schedule</span>
        </button>
      </div>
    </div>
  );
}
