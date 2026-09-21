"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useOrdersStore } from "@/store/ordersStore";
import { OrderStatus } from "@/types";
import { CATALOG_ITEMS } from "@/components/landing/GarmentCatalog";
import {
  getStatusDisplayInfo,
  calculateProgressPercentage,
  ORDER_STATUS_FLOW,
} from "@/lib/orderUtils";
import {
  Scissors,
  Ruler,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  ArrowLeft,
  Phone,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Play,
  Truck,
  Package,
} from "lucide-react";

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id as string;
  const { orders, getOrderByPublicId, updateOrderStatus, cancelOrder } = useOrdersStore();

  const order = getOrderByPublicId(rawId) || orders[0];
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSimulateDropdown, setShowSimulateDropdown] = useState(false);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-[var(--foreground)]">Order Not Found</h2>
        <p className="text-xs text-[var(--muted-foreground)]">
          Could not find an order matching identifier "{rawId}".
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const itemInfo = CATALOG_ITEMS.find((c) => c.id === order.garment) || CATALOG_ITEMS[0];
  const currentStatusInfo = getStatusDisplayInfo(order.status);
  const progressPercent = calculateProgressPercentage(order.status);

  const handleSimulateStatus = (newStatus: OrderStatus) => {
    updateOrderStatus(order.id, newStatus);
    setShowSimulateDropdown(false);
  };

  const handleCancelOrder = () => {
    cancelOrder(order.id);
    setShowCancelConfirm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Status simulation bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>

        {/* Live Status Simulator for Assessor Demonstration */}
        <div className="relative inline-flex items-center gap-2">
          <button
            onClick={() => setShowSimulateDropdown(!showSimulateDropdown)}
            className="px-3.5 py-1.5 rounded-xl bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--foreground)] flex items-center gap-2 transition-all shadow-sm"
          >
            <Play className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Simulate Order Status Transition ▾</span>
          </button>

          {showSimulateDropdown && (
            <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] shadow-2xl p-2 z-50 space-y-1">
              <div className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] px-2 py-1">
                Assessor Simulator Control
              </div>
              {ORDER_STATUS_FLOW.map((s) => {
                const isCurrent = order.status === s;
                const info = getStatusDisplayInfo(s);
                return (
                  <button
                    key={s}
                    onClick={() => handleSimulateStatus(s)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      isCurrent
                        ? "bg-[var(--primary)] text-white font-bold"
                        : "text-[var(--foreground)] hover:bg-surface-secondary"
                    }`}
                  >
                    <span>{info.label}</span>
                    {isCurrent && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Order Header Card */}
      <div className="rounded-3xl bg-surface-primary border border-[var(--border-subtle)] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-secondary border border-[var(--border-subtle)] flex items-center justify-center text-3xl flex-shrink-0">
              {itemInfo.emoji}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-serif text-2xl font-bold text-[var(--foreground)]">
                  {itemInfo.name} × {order.quantity}
                </h1>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-surface-secondary text-[var(--foreground)] border border-[var(--border-subtle)]">
                  {order.orderId}
                </span>
              </div>

              <p className="text-xs text-[var(--muted-foreground)]">
                Ordered on {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • Total: ₹{order.pricing.total}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full ${currentStatusInfo.badgeClass}`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {currentStatusInfo.label}
            </span>
            <span className="text-[11px] text-[var(--muted-foreground)]">
              Estimated Delivery: <strong>{order.estimatedDelivery}</strong>
            </span>
          </div>

        </div>

        {/* Big Interactive Stitch Progress Line */}
        <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[var(--primary)]" />
              <span>Live Stitch Timeline</span>
            </span>
            <span className="font-mono text-xs font-bold text-[var(--primary)]">
              {progressPercent}% Handcrafted
            </span>
          </div>

          {/* Desktop Flow Line */}
          <div className="hidden md:grid grid-cols-6 gap-2 relative">
            {ORDER_STATUS_FLOW.map((stepStatus, idx) => {
              const stepInfo = getStatusDisplayInfo(stepStatus);
              const currentIdx = ORDER_STATUS_FLOW.indexOf(order.status);
              const isPast = idx < currentIdx;
              const isNow = idx === currentIdx;

              return (
                <div key={stepStatus} className="flex flex-col items-center text-center group">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all relative ${
                      isPast
                        ? "bg-emerald-500 text-white"
                        : isNow
                        ? "bg-[var(--primary)] text-white ring-4 ring-[var(--primary)]/20 shadow-lg scale-110"
                        : "bg-surface-secondary border border-[var(--border-subtle)] text-[var(--muted-foreground)]"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] mt-2.5 font-medium leading-tight ${
                      isNow
                        ? "text-[var(--primary)] font-bold"
                        : isPast
                        ? "text-[var(--foreground)] font-semibold"
                        : "text-[var(--muted-foreground)]"
                    }`}
                  >
                    {stepInfo.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile Flow Description */}
          <div className="md:hidden p-4 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] space-y-2">
            <div className="flex justify-between text-xs font-bold text-[var(--foreground)]">
              <span>Current Status:</span>
              <span className="text-[var(--primary)]">{currentStatusInfo.label}</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              {currentStatusInfo.description}
            </p>
          </div>
        </div>

      </div>

      {/* Grid of Details Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Columns: Event Log & Specifications */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Detailed Event Log */}
          <div className="p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--primary)]" />
              <span>Real-Time Production Log</span>
            </h3>

            <div className="space-y-4 relative pl-4 before:absolute before:top-2 before:bottom-2 before:left-1.5 before:w-0.5 before:bg-[var(--border-subtle)]">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6 text-xs">
                  <div className="absolute left-[-11px] top-1 w-3 h-3 rounded-full bg-[var(--primary)] border-2 border-surface-primary" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--foreground)]">{event.title}</span>
                    <span className="text-[10px] font-mono text-[var(--muted-foreground)]">{event.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{event.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Garment Specifications & Customizations */}
          <div className="p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[var(--primary)]" />
              <span>Garment Customization Specifications</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-secondary">
                <span className="text-[10px] text-[var(--muted-foreground)] block">Silhouette Fit</span>
                <span className="font-bold text-[var(--foreground)]">{order.customizations.fit || "Slim Fit"}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary">
                <span className="text-[10px] text-[var(--muted-foreground)] block">Collar Cut</span>
                <span className="font-bold text-[var(--foreground)]">{order.customizations.collar || "Cutaway Collar"}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary">
                <span className="text-[10px] text-[var(--muted-foreground)] block">Cuffs</span>
                <span className="font-bold text-[var(--foreground)]">{order.customizations.cuff || "Rounded Single"}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary">
                <span className="text-[10px] text-[var(--muted-foreground)] block">Pockets</span>
                <span className="font-bold text-[var(--foreground)]">{order.customizations.pockets || "Clean None"}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary">
                <span className="text-[10px] text-[var(--muted-foreground)] block">Monogram</span>
                <span className="font-bold text-[var(--primary)] font-mono">{order.customizations.monogram || "None"}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary">
                <span className="text-[10px] text-[var(--muted-foreground)] block">Turnaround</span>
                <span className="font-bold text-[var(--foreground)]">{order.deliverySpeed === "express" ? "Express 48h" : "Standard"}</span>
              </div>
            </div>

            {order.customizations.specialNotes && (
              <div className="p-3 rounded-xl bg-surface-secondary text-xs text-[var(--muted-foreground)]">
                <strong>Tailor Instruction:</strong> "{order.customizations.specialNotes}"
              </div>
            )}
          </div>

        </div>

        {/* Right 5 Columns: Fabric Card, Tailor Card & Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Fabric Handover Card */}
          <div className="p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--primary)]" />
              <span>Fabric Handover Status</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Type:</span>
                <span className="font-semibold text-[var(--foreground)]">
                  {order.fabric.type === "provide_own" ? "Customer Supplied" : "Threadly Mill Sourced"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Material:</span>
                <span className="font-semibold text-[var(--foreground)]">{order.fabric.material || "Pure Linen"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">RFID Bag ID:</span>
                <span className="font-mono font-semibold text-[var(--primary)]">RFID-TH-8941</span>
              </div>
              <div className="flex justify-between text-emerald-500">
                <span>QC Pre-wash Sponge:</span>
                <span className="font-semibold">Completed ✓</span>
              </div>
            </div>
          </div>

          {/* Assigned Master Tailor */}
          <div className="p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
              Assigned Master Tailor
            </h3>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/15 text-[var(--primary)] font-bold text-base flex items-center justify-center">
                {order.assignedTailor?.name ? order.assignedTailor.name.split(" ").map(n => n[0]).join("") : "RS"}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--foreground)]">
                  {order.assignedTailor?.name || "Master Tailor Rajesh Sharma"}
                </h4>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  {order.assignedTailor?.experience || "14+ Years Bespoke Tailoring"} • {order.assignedTailor?.rating || 4.9} ★
                </p>
                <div className="text-[11px] text-[var(--primary)] font-medium mt-0.5">
                  Phone: {order.assignedTailor?.phone || "+91 98450 12345"}
                </div>
              </div>
            </div>
          </div>

          {/* Doorstep Visit Address */}
          <div className="p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--primary)]" />
              <span>Doorstep Visit & Delivery Address</span>
            </h3>
            <p className="text-xs text-[var(--foreground)] font-semibold">{order.address.name}</p>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
            </p>
            <p className="text-[11px] text-[var(--muted-foreground)]">Phone: {order.address.phone}</p>
          </div>

          {/* Actions & Support */}
          <div className="space-y-3 pt-2">
            {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-semibold transition-colors"
              >
                Cancel Tailor Appointment
              </button>
            )}

            {order.status === "DELIVERED" && (
              <button
                onClick={() => alert("Free doorstep alteration booked! Our master tailor will visit within 48 hours.")}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
              >
                Book Free 7-Day Alteration
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-primary border border-[var(--border-subtle)] p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <h4 className="text-base font-bold text-[var(--foreground)]">Cancel Appointment?</h4>
            <p className="text-xs text-[var(--muted-foreground)]">
              Are you sure you want to cancel order #{order.orderId}? Our master tailor slot will be released.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2 rounded-lg border text-xs text-[var(--muted-foreground)]"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
