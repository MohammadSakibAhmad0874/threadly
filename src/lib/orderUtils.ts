import {
  Order,
  OrderStatus,
  OrderEvent,
  BookingFormData,
  OrderPricing,
  GarmentType,
  DeliverySpeed,
} from "@/types";

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "BOOKED",
  "TAILOR_ASSIGNED",
  "MEASUREMENT_COMPLETED",
  "FABRIC_HANDED_OVER",
  "IN_STITCHING",
  "QUALITY_CHECK",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `THR-${year}-${suffix}`;
}

export function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const BASE_STITCH_PRICES: Record<GarmentType, number> = {
  shirt: 699,
  trousers: 899,
  suit: 3499,
  kurta: 799,
  blouse: 649,
  dress: 1199,
};

const FABRIC_PRICES: Record<GarmentType, number> = {
  shirt: 800,
  trousers: 950,
  suit: 3800,
  kurta: 700,
  blouse: 550,
  dress: 1200,
};

export function calculateOrderPricing(data: BookingFormData): OrderPricing {
  const qty = data.quantity || 1;
  const baseStitch = (BASE_STITCH_PRICES[data.garment] || 699) * qty;
  const fabricFee = data.fabric.type === "source_threadly" ? (FABRIC_PRICES[data.garment] || 800) * qty : 0;
  const expressFee = data.deliverySpeed === "express" ? 300 : 0;
  const monogramFee = data.customizations.monogram && data.customizations.monogram.trim().length > 0 ? 150 : 0;
  const total = baseStitch + fabricFee + expressFee + monogramFee;

  return {
    stitchingFee: baseStitch,
    fabricFee,
    expressFee,
    monogramFee,
    total,
  };
}

export function calculateETA(dateStr: string, garment: GarmentType, speed: DeliverySpeed): string {
  const baseDays = speed === "express" ? 2 : garment === "suit" ? 7 : 4;
  const d = new Date(dateStr || Date.now());
  d.setDate(d.getDate() + baseDays);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getStatusDisplayInfo(status: OrderStatus): {
  label: string;
  badgeClass: string;
  description: string;
} {
  switch (status) {
    case "BOOKED":
      return {
        label: "Tailor Booked",
        badgeClass: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
        description: "Appointment confirmed. We're reserving your master tailor slot.",
      };
    case "TAILOR_ASSIGNED":
      return {
        label: "Master Tailor Assigned",
        badgeClass: "bg-sky-500/10 text-sky-500 border border-sky-500/20",
        description: "Master Tailor Rajesh Sharma is preparing for your visit.",
      };
    case "MEASUREMENT_COMPLETED":
      return {
        label: "Measurements Completed",
        badgeClass: "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20",
        description: "14 anatomical checkpoints digitized and uploaded to atelier.",
      };
    case "FABRIC_HANDED_OVER":
      return {
        label: "Fabric Handed Over & QC",
        badgeClass: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
        description: "Fabric tagged with RFID bag and passed pre-wash shrinkage inspection.",
      };
    case "IN_STITCHING":
      return {
        label: "Master Cutting & Stitching",
        badgeClass: "bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30",
        description: "Pattern drafted and master tailor needlework in active progress.",
      };
    case "QUALITY_CHECK":
      return {
        label: "Atelier Quality Inspection",
        badgeClass: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
        description: "Seam stress-testing, hand pressing, button inspection, and dimensions audit.",
      };
    case "OUT_FOR_DELIVERY":
      return {
        label: "Out for Delivery",
        badgeClass: "bg-teal-500/10 text-teal-500 border border-teal-500/20",
        description: "Garment is steamed, boxed, and on its way to your doorstep.",
      };
    case "DELIVERED":
      return {
        label: "Delivered & Fit Guaranteed",
        badgeClass: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
        description: "Garment delivered. Covered by our 100% Free 7-Day Alteration Promise.",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        badgeClass: "bg-red-500/10 text-red-500 border border-red-500/20",
        description: "Appointment was cancelled and tailor slot was released.",
      };
    default:
      return {
        label: "In Progress",
        badgeClass: "bg-surface-secondary text-[var(--muted-foreground)]",
        description: "Order is progressing normally.",
      };
  }
}

export function calculateProgressPercentage(status: OrderStatus): number {
  if (status === "CANCELLED") return 0;
  const idx = ORDER_STATUS_FLOW.indexOf(status);
  if (idx === -1) return 20;
  return Math.round(((idx + 1) / ORDER_STATUS_FLOW.length) * 100);
}

export function buildInitialTimeline(dateStr: string, timeSlot: string): OrderEvent[] {
  return [
    {
      id: uuid(),
      status: "BOOKED",
      title: "Doorstep Appointment Confirmed",
      description: `Visit scheduled for ${dateStr} during ${timeSlot}.`,
      timestamp: "Just now",
    },
    {
      id: uuid(),
      status: "TAILOR_ASSIGNED",
      title: "Master Tailor Assigned",
      description: "Master Tailor Rajesh Sharma (14 yrs exp) assigned to visit.",
      timestamp: "Today",
    },
  ];
}
