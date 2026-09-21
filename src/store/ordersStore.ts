import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Order, OrderStatus, BookingFormData } from "@/types";
import {
  generateOrderId,
  uuid,
  calculateOrderPricing,
  calculateETA,
  buildInitialTimeline,
  getStatusDisplayInfo,
} from "@/lib/orderUtils";

interface OrdersState {
  orders: Order[];
  isSyncing: boolean;
  lastSyncedAt: string | null;

  // Local-first actions (optimistic)
  createOrder: (data: BookingFormData) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getOrderByPublicId: (publicId: string) => Order | undefined;
  cancelOrder: (id: string) => void;
  seedDemoOrderIfEmpty: () => void;

  // Backend sync actions
  fetchOrdersFromDB: (phone: string) => Promise<void>;
  syncOrderToDB: (order: Order, phone: string) => Promise<void>;
}

const DEMO_ORDER: Order = {
  id: "demo-ord-1",
  orderId: "THR-2026-DEMO1",
  garment: "shirt",
  quantity: 1,
  customizations: {
    fit: "Slim Fit",
    collar: "Cutaway Collar",
    cuff: "French Double Cuff",
    pockets: "No Pocket (Clean Modern)",
    monogram: "SMA",
    specialNotes: "Slight ease on sleeves, crisp stiffened collar interlining.",
  },
  measurementMethod: "doorstep_tailor",
  fabric: {
    type: "provide_own",
    material: "Pure Egyptian Linen (White)",
    notes: "2.4m handed over with RFID tag",
  },
  schedule: {
    date: "2026-09-22",
    timeSlot: "10:00 AM – 01:00 PM (Morning)",
  },
  deliverySpeed: "standard",
  address: {
    id: "addr-demo",
    name: "Home Penthouse",
    street: "Flat 402, Prestige Palms, 12th Main Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  pricing: {
    stitchingFee: 699,
    fabricFee: 0,
    expressFee: 0,
    monogramFee: 150,
    total: 849,
  },
  status: "IN_STITCHING",
  estimatedDelivery: "Sep 25, 2026",
  createdAt: "2026-09-20T10:00:00.000Z",
  updatedAt: "2026-09-21T03:00:00.000Z",
  timeline: [
    {
      id: "ev-1",
      status: "BOOKED",
      title: "Doorstep Appointment Booked",
      description: "Booking confirmed for doorstep fitting.",
      timestamp: "Sep 20, 10:00 AM",
    },
    {
      id: "ev-2",
      status: "TAILOR_ASSIGNED",
      title: "Master Tailor Assigned",
      description: "Rajesh Sharma (14 yrs exp) assigned to appointment.",
      timestamp: "Sep 20, 11:30 AM",
    },
    {
      id: "ev-3",
      status: "MEASUREMENT_COMPLETED",
      title: "Doorstep Measurements Completed",
      description: "14 anatomical checkpoints mapped & posture profile saved.",
      timestamp: "Sep 21, 10:45 AM",
    },
    {
      id: "ev-4",
      status: "FABRIC_HANDED_OVER",
      title: "Fabric Inspected & RFID Tagged",
      description: "2.4m Egyptian Linen passed shrinkage sponge pre-wash.",
      timestamp: "Sep 21, 11:15 AM",
    },
    {
      id: "ev-5",
      status: "IN_STITCHING",
      title: "Master Cutting & Atelier Stitching",
      description: "Pattern drafted and master tailor needlework in active progress.",
      timestamp: "Today, 02:00 PM",
    },
  ],
  assignedTailor: {
    name: "Master Tailor Rajesh Sharma",
    experience: "14+ Years Bespoke Tailoring",
    rating: 4.9,
    phone: "+91 98450 12345",
  },
};

// Map a Supabase DB row → frontend Order shape
function dbRowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    orderId: row.id as string,
    garment: row.garment_type as Order["garment"],
    quantity: 1,
    customizations: (row.measurements as Order["customizations"]) ?? {},
    measurementMethod: "doorstep_tailor",
    fabric: (row.fabric as Order["fabric"]) ?? {
      type: "provide_own",
      material: "",
      notes: "",
    },
    schedule: {
      date: (row.pickup_date as string) ?? "",
      timeSlot: (row.pickup_time as string) ?? "",
    },
    deliverySpeed: "standard",
    address: (row.address as Order["address"]) ?? {
      id: "addr-1",
      name: "Home",
      street: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      isDefault: true,
    },
    pricing: {
      stitchingFee: Math.round(((row.price as number) ?? 0) / 100),
      fabricFee: 0,
      expressFee: 0,
      monogramFee: 0,
      total: Math.round(((row.price as number) ?? 0) / 100),
    },
    status: (row.status as OrderStatus) ?? "ORDER_PLACED",
    estimatedDelivery: (row.delivery_date as string) ?? "",
    createdAt: (row.created_at as string) ?? new Date().toISOString(),
    updatedAt: (row.updated_at as string) ?? new Date().toISOString(),
    timeline: (row.timeline as Order["timeline"]) ?? [],
    assignedTailor: {
      name: "Master Tailor Rajesh Sharma",
      experience: "14+ Years Bespoke Tailoring",
      rating: 4.9,
      phone: "+91 98450 12345",
    },
  };
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [DEMO_ORDER],
      isSyncing: false,
      lastSyncedAt: null,

      // ── Fetch orders from Supabase ──────────────────────────
      fetchOrdersFromDB: async (phone: string) => {
        set({ isSyncing: true });
        try {
          const res = await fetch("/api/orders", {
            headers: { "x-user-phone": phone },
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const { orders: dbOrders } = await res.json();

          const mapped = (dbOrders as Record<string, unknown>[]).map(dbRowToOrder);
          // Merge: keep demo order, prepend real DB orders
          set((state) => {
            const demo = state.orders.filter((o) => o.id === "demo-ord-1");
            const existing = new Set(mapped.map((o) => o.id));
            const merged = [
              ...mapped,
              ...demo.filter((d) => !existing.has(d.id)),
            ];
            return {
              orders: merged,
              isSyncing: false,
              lastSyncedAt: new Date().toISOString(),
            };
          });
        } catch (err) {
          console.warn("fetchOrdersFromDB failed (offline mode):", err);
          set({ isSyncing: false });
        }
      },

      // ── Sync a single order to Supabase ────────────────────
      syncOrderToDB: async (order: Order, phone: string) => {
        try {
          await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-user-phone": phone,
            },
            body: JSON.stringify({
              id: order.orderId,
              userId: phone,
              garmentType: order.garment,
              garmentName: order.garment,
              status: order.status,
              pickupDate: order.schedule.date,
              pickupTime: order.schedule.timeSlot,
              deliveryDate: order.estimatedDelivery,
              address: order.address,
              measurements: order.customizations,
              fabric: order.fabric,
              price: (order.pricing?.total ?? 0) * 100, // store in paise
              timeline: order.timeline,
              notes: order.customizations?.specialNotes ?? null,
            }),
          });
        } catch (err) {
          console.warn("syncOrderToDB failed (will retry on next load):", err);
        }
      },

      // ── Local-first order creation ──────────────────────────
      createOrder: async (data: BookingFormData) => {
        const id = uuid();
        const orderId = generateOrderId();
        const pricing = calculateOrderPricing(data);
        const eta = calculateETA(data.schedule.date, data.garment, data.deliverySpeed);
        const now = new Date().toISOString();

        const newOrder: Order = {
          id,
          orderId,
          garment: data.garment,
          quantity: data.quantity,
          customizations: data.customizations,
          measurementMethod: data.measurementMethod,
          fabric: data.fabric,
          schedule: data.schedule,
          deliverySpeed: data.deliverySpeed,
          address: data.address,
          pricing,
          status: "BOOKED",
          estimatedDelivery: eta,
          createdAt: now,
          updatedAt: now,
          timeline: buildInitialTimeline(data.schedule.date, data.schedule.timeSlot),
          assignedTailor: {
            name: "Master Tailor Rajesh Sharma",
            experience: "14+ Years Bespoke Tailoring",
            rating: 4.9,
            phone: "+91 98450 12345",
          },
        };

        // Optimistic local update
        set((state) => ({ orders: [newOrder, ...state.orders] }));

        // Background sync to DB (fire-and-forget; no await to block UI)
        const phone =
          data.address?.phone?.replace(/\D/g, "") ?? "9999999999";
        get().syncOrderToDB(newOrder, phone);

        return newOrder;
      },

      updateOrderStatus: (id: string, newStatus: OrderStatus) => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id !== id && o.orderId !== id) return o;
            const statusInfo = getStatusDisplayInfo(newStatus);
            const now = new Date();
            const timeFormatted = now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            const newEvent = {
              id: uuid(),
              status: newStatus,
              title: statusInfo.label,
              description: statusInfo.description,
              timestamp: `Today, ${timeFormatted}`,
            };

            return {
              ...o,
              status: newStatus,
              updatedAt: now.toISOString(),
              timeline: [...o.timeline, newEvent],
            };
          }),
        }));
      },

      getOrderByPublicId: (publicId: string) => {
        return get().orders.find(
          (o) => o.orderId === publicId || o.id === publicId
        );
      },

      cancelOrder: (id: string) => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id !== id && o.orderId !== id) return o;
            return {
              ...o,
              status: "CANCELLED",
              updatedAt: new Date().toISOString(),
              timeline: [
                ...o.timeline,
                {
                  id: uuid(),
                  status: "CANCELLED",
                  title: "Order Cancelled",
                  description: "Appointment cancelled and slot released.",
                  timestamp: "Just now",
                },
              ],
            };
          }),
        }));
      },

      seedDemoOrderIfEmpty: () => {
        if (get().orders.length === 0) {
          set({ orders: [DEMO_ORDER] });
        }
      },
    }),
    {
      name: "threadly_orders_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
