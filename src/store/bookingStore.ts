import { create } from "zustand";
import {
  BookingFormData,
  GarmentType,
  MeasurementMethod,
  CustomizationOptions,
  FabricChoice,
  ScheduleSlot,
  DeliverySpeed,
  Address,
} from "@/types";

interface BookingState {
  step: number;
  data: BookingFormData;
  confirmedOrderId: string | null;
  confirmedOrderDbId: string | null;

  setStep: (step: number) => void;
  setGarment: (garment: GarmentType) => void;
  setQuantity: (qty: number) => void;
  setCustomizations: (c: CustomizationOptions) => void;
  setMeasurementMethod: (m: MeasurementMethod) => void;
  setFabric: (f: FabricChoice) => void;
  setSchedule: (s: ScheduleSlot) => void;
  setDeliverySpeed: (d: DeliverySpeed) => void;
  setAddress: (a: Address) => void;
  setConfirmedOrder: (orderId: string, id: string) => void;
  reset: () => void;
}

const INITIAL_DATA: BookingFormData = {
  garment: "shirt",
  quantity: 1,
  customizations: {
    fit: "Slim Fit",
    collar: "Cutaway Collar",
    cuff: "Single Button Rounded",
    pockets: "No Pocket (Clean Modern)",
    monogram: "",
    specialNotes: "",
  },
  measurementMethod: "doorstep_tailor",
  fabric: {
    type: "provide_own",
    material: "Pure Cotton Linen",
    notes: "2.0 meters",
  },
  schedule: {
    date: "",
    timeSlot: "10:00 AM – 01:00 PM (Morning)",
  },
  deliverySpeed: "standard",
  address: {
    id: "addr-001",
    name: "Home Penthouse",
    street: "Flat 402, Prestige Palms, 12th Main Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    phone: "+91 98765 43210",
    isDefault: true,
  },
};

export const useBookingStore = create<BookingState>()((set) => ({
  step: 1,
  data: INITIAL_DATA,
  confirmedOrderId: null,
  confirmedOrderDbId: null,

  setStep: (step) => set({ step }),
  setGarment: (garment) => set((s) => ({ data: { ...s.data, garment } })),
  setQuantity: (quantity) => set((s) => ({ data: { ...s.data, quantity } })),
  setCustomizations: (customizations) => set((s) => ({ data: { ...s.data, customizations } })),
  setMeasurementMethod: (measurementMethod) => set((s) => ({ data: { ...s.data, measurementMethod } })),
  setFabric: (fabric) => set((s) => ({ data: { ...s.data, fabric } })),
  setSchedule: (schedule) => set((s) => ({ data: { ...s.data, schedule } })),
  setDeliverySpeed: (deliverySpeed) => set((s) => ({ data: { ...s.data, deliverySpeed } })),
  setAddress: (address) => set((s) => ({ data: { ...s.data, address } })),
  setConfirmedOrder: (orderId, id) =>
    set({ confirmedOrderId: orderId, confirmedOrderDbId: id }),
  reset: () =>
    set({
      step: 1,
      data: INITIAL_DATA,
      confirmedOrderId: null,
      confirmedOrderDbId: null,
    }),
}));
