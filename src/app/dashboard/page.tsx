"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrdersStore } from "@/store/ordersStore";
import { useUserStore } from "@/store/userStore";
import { Order, OrderStatus } from "@/types";
import { getStatusDisplayInfo, calculateProgressPercentage } from "@/lib/orderUtils";
import { CATALOG_ITEMS } from "@/components/landing/GarmentCatalog";
import {
  PlusCircle,
  Clock,
  Scissors,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Package,
  Ruler,
  AlertCircle,
  Filter,
} from "lucide-react";

type FilterTab = "all" | "active" | "in_stitching" | "completed";

export default function DashboardPage() {
  const { orders, seedDemoOrderIfEmpty } = useOrdersStore();
  const { user } = useUserStore();
  const [filter, setFilter] = useState<FilterTab>("all");

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "active") return order.status !== "DELIVERED" && order.status !== "CANCELLED";
    if (filter === "in_stitching") return order.status === "IN_STITCHING" || order.status === "QUALITY_CHECK";
    if (filter === "completed") return order.status === "DELIVERED";
    return true;
  });

  const activeCount = orders.filter((o) => o.status !== "DELIVERED" && o.status !== "CANCELLED").length;
  const completedCount = orders.filter((o) => o.status === "DELIVERED").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[var(--border-subtle)]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[var(--primary)] font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Bespoke Hub</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            Welcome back, {user?.name || "Customer"}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
            Manage your bespoke wardrobe, track ongoing tailoring, and book doorstep fittings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/ai"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Style Advisor</span>
          </Link>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold shadow-md transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Custom Order</span>
          </Link>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <div className="p-5 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Total Orders</span>
            <Package className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div className="text-2xl font-black text-[var(--foreground)]">{orders.length}</div>
          <div className="text-[10px] text-[var(--muted-foreground)]">Across all garments</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Active in Progress</span>
            <Scissors className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-500">{activeCount}</div>
          <div className="text-[10px] text-[var(--muted-foreground)]">Tailoring or scheduled</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Delivered Fits</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-500">{completedCount}</div>
          <div className="text-[10px] text-[var(--muted-foreground)]">Handcrafted & fit-guaranteed</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Fit Profiles</span>
            <Ruler className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-[var(--foreground)]">
            {user?.measurements ? "1 Calibrated" : "Default"}
          </div>
          <Link href="/profile" className="text-[10px] text-[var(--primary)] hover:underline block">
            View body dimensions →
          </Link>
        </div>
      </div>

      {/* Orders Section */}
      <div className="space-y-6">
        {/* Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-secondary border border-[var(--border-subtle)]">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "all"
                  ? "bg-surface-primary text-[var(--foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "active"
                  ? "bg-surface-primary text-[var(--foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setFilter("in_stitching")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "in_stitching"
                  ? "bg-surface-primary text-[var(--foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              In Atelier
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "completed"
                  ? "bg-surface-primary text-[var(--foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Delivered ({completedCount})
            </button>
          </div>

          <span className="text-xs text-[var(--muted-foreground)]">
            Showing {filteredOrders.length} orders
          </span>
        </div>

        {/* Order Cards List */}
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-surface-primary border border-[var(--border-subtle)] space-y-4">
            <Package className="w-12 h-12 text-[var(--muted-foreground)] mx-auto opacity-40" />
            <h3 className="text-base font-bold text-[var(--foreground)]">No orders in this category</h3>
            <p className="text-xs text-[var(--muted-foreground)] max-w-sm mx-auto">
              Ready for your next bespoke garment? Choose a style and book a doorstep tailor visit in minutes.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book Your First Fit</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const itemInfo = CATALOG_ITEMS.find((c) => c.id === order.garment) || CATALOG_ITEMS[0];
              const statusInfo = getStatusDisplayInfo(order.status);
              const progress = calculateProgressPercentage(order.status);

              return (
                <div
                  key={order.id}
                  className="rounded-2xl bg-surface-primary border border-[var(--border-subtle)] p-6 hover:border-[var(--primary)]/40 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Garment info */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-surface-secondary border border-[var(--border-subtle)] flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform">
                        {itemInfo.emoji}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-[var(--foreground)]">
                            {itemInfo.name} × {order.quantity}
                          </h3>
                          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-surface-secondary text-[var(--muted-foreground)]">
                            {order.orderId}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] flex-wrap">
                          <span>Fit: {order.customizations.fit || "Slim"}</span>
                          <span>•</span>
                          <span>Fabric: {order.fabric.material || "Customer Linen"}</span>
                          <span>•</span>
                          <span>{order.schedule.date} ({order.schedule.timeSlot.split(" ")[0]})</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status badge & price */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-[var(--border-subtle)]">
                      <div className="text-left lg:text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.badgeClass}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {statusInfo.label}
                        </span>
                        <div className="text-xs font-mono font-bold text-[var(--foreground)] mt-1.5">
                          ₹{order.pricing.total}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/orders/${order.orderId}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--foreground)] transition-colors"
                        >
                          <span>Track</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]/70 flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--muted-foreground)] whitespace-nowrap">
                      {progress}% complete
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
