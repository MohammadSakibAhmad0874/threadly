"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle2, Copy, Check, ArrowRight, Calendar, Clock, MapPin, Scissors, UserCheck, ShieldCheck } from "lucide-react";
import { useOrdersStore } from "@/store/ordersStore";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id") || "THR-2026-DEMO1";
  const { getOrderByPublicId } = useOrdersStore();
  const order = getOrderByPublicId(orderId);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fire festive confetti on arrival
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C59B27", "#3B82F6", "#10B981", "#EC4899"],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-in fade-in duration-500">
      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-3">
        Tailor Appointment Confirmed
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
        Your Fitting Is Booked!
      </h1>
      <p className="text-sm text-[var(--muted-foreground)] mt-2 max-w-lg mx-auto">
        We’ve reserved your doorstep slot. Our master tailor has received your order specifications and will arrive at your address.
      </p>

      {/* Order ID Reveal Card */}
      <div className="mt-8 max-w-md mx-auto p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] shadow-xl relative overflow-hidden">
        <div className="text-[11px] font-mono text-[var(--muted-foreground)] uppercase tracking-wider">
          Official Order Identifier
        </div>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="font-mono text-2xl sm:text-3xl font-black text-[var(--primary)] tracking-wider">
            {orderId}
          </span>
          <button
            onClick={handleCopy}
            title="Copy Order ID"
            className="p-2 rounded-lg bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        {copied && (
          <span className="text-[11px] text-emerald-500 font-semibold block mt-1">
            Copied to clipboard!
          </span>
        )}
      </div>

      {/* Scheduled Tailor Details */}
      <div className="mt-8 rounded-2xl bg-surface-secondary/60 border border-[var(--border-subtle)] p-6 text-left max-w-xl mx-auto space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
          Doorstep Appointment Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-[var(--muted-foreground)] block">Visit Date & Time</span>
              <span className="font-semibold text-[var(--foreground)]">
                {order?.schedule.date || "Tomorrow"} • {order?.schedule.timeSlot || "Morning Slot"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-[var(--muted-foreground)] block">Address</span>
              <span className="font-semibold text-[var(--foreground)] truncate block max-w-[200px]">
                {order?.address.street || "Your Saved Address"}, {order?.address.city || "Bengaluru"}
              </span>
            </div>
          </div>
        </div>

        {/* Assigned Tailor Info */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center font-bold text-sm">
              RS
            </div>
            <div className="text-xs">
              <span className="font-bold text-[var(--foreground)] block">Master Tailor Rajesh Sharma</span>
              <span className="text-[11px] text-[var(--muted-foreground)]">14+ yrs experience • 4.9 ★ (1,200+ fits)</span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold">
            Assigned
          </span>
        </div>
      </div>

      {/* What Happens Next steps */}
      <div className="mt-8 max-w-xl mx-auto text-left space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
          What Happens Next:
        </h4>
        <div className="space-y-2 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-surface-secondary text-[var(--foreground)] flex items-center justify-center text-[10px] font-bold">1</span>
            <span>You will receive an SMS reminder 30 minutes before the tailor arrives.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-surface-secondary text-[var(--foreground)] flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Tailor takes measurements or accepts your sample garment and fabric.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-surface-secondary text-[var(--foreground)] flex items-center justify-center text-[10px] font-bold">3</span>
            <span>Track every stitch live from cutting to final pressing on the tracking dashboard.</span>
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <Link
          href={`/orders/${orderId}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs sm:text-sm font-bold shadow-lg transition-all"
        >
          <span>Track Live Stitching</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-[var(--foreground)] text-xs sm:text-sm font-semibold transition-all"
        >
          <span>Go to Orders Dashboard</span>
        </Link>
      </div>

      {/* Bottom guarantee */}
      <div className="mt-10 flex items-center justify-center gap-2 text-xs text-[var(--muted-foreground)]">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>100% Free Fit Guarantee on delivery</span>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
