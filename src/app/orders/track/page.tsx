"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Scissors, ArrowRight, Package } from "lucide-react";
import { useOrdersStore } from "@/store/ordersStore";

export default function TrackOrderSearchPage() {
  const router = useRouter();
  const [orderInput, setOrderInput] = useState("");
  const { orders } = useOrdersStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput.trim()) return;
    router.push(`/orders/${orderInput.trim().toUpperCase()}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-8 animate-in fade-in duration-300">
      <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mx-auto">
        <Scissors className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-3xl font-extrabold text-[var(--foreground)]">
          Live Stitch & Order Tracker
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
          Enter your 14-digit order reference (e.g. THR-2026-DEMO1) to view real-time atelier progress.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--muted-foreground)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. THR-2026-DEMO1"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-primary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none uppercase font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all whitespace-nowrap"
          >
            Track
          </button>
        </div>
      </form>

      {/* Quick click demo / recent orders */}
      {orders.length > 0 && (
        <div className="pt-6 border-t border-[var(--border-subtle)] text-left max-w-md mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block mb-3">
            Or Click a Recent Order:
          </span>
          <div className="space-y-2">
            {orders.slice(0, 3).map((o) => (
              <Link
                key={o.id}
                href={`/orders/${o.orderId}`}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-primary border border-[var(--border-subtle)] hover:border-[var(--primary)] text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-[var(--primary)]" />
                  <span className="font-mono font-bold text-[var(--foreground)]">{o.orderId}</span>
                  <span className="text-[11px] text-[var(--muted-foreground)] capitalize">({o.garment})</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--primary)]" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
