// ─── THREADLY Unified Core Types ───────────────────────────────────────────

export type GarmentType =
  | "shirt"
  | "trousers"
  | "suit"
  | "kurta"
  | "blouse"
  | "dress";

export type MeasurementMethod =
  | "doorstep_tailor"
  | "sample_garment"
  | "stored_profile";

export type FabricSourceType = "provide_own" | "source_threadly";

export type DeliverySpeed = "standard" | "express";

export type OrderStatus =
  | "BOOKED"
  | "TAILOR_ASSIGNED"
  | "MEASUREMENT_COMPLETED"
  | "FABRIC_HANDED_OVER"
  | "IN_STITCHING"
  | "QUALITY_CHECK"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface CustomizationOptions {
  fit?: string;
  collar?: string;
  cuff?: string;
  pockets?: string;
  monogram?: string;
  specialNotes?: string;
}

export interface FabricChoice {
  type: FabricSourceType;
  material: string;
  notes?: string;
}

export interface ScheduleSlot {
  date: string;
  timeSlot: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
}

export interface MeasurementProfile {
  chest?: number;
  waist?: number;
  hip?: number;
  inseam?: number;
  shoulder?: number;
  sleeveLength?: number;
  neck?: number;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  measurements?: MeasurementProfile;
}

export interface OrderPricing {
  stitchingFee: number;
  fabricFee: number;
  expressFee: number;
  monogramFee: number;
  total: number;
}

export interface OrderEvent {
  id: string;
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
}

export interface AssignedTailor {
  name: string;
  experience: string;
  rating: number;
  phone: string;
}

export interface Order {
  id: string;
  orderId: string; // THR-YYYY-XXXXX
  garment: GarmentType;
  quantity: number;
  customizations: CustomizationOptions;
  measurementMethod: MeasurementMethod;
  fabric: FabricChoice;
  schedule: ScheduleSlot;
  deliverySpeed: DeliverySpeed;
  address: Address;
  pricing: OrderPricing;
  status: OrderStatus;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderEvent[];
  assignedTailor: AssignedTailor;
}

export interface BookingFormData {
  garment: GarmentType;
  quantity: number;
  customizations: CustomizationOptions;
  measurementMethod: MeasurementMethod;
  fabric: FabricChoice;
  schedule: ScheduleSlot;
  deliverySpeed: DeliverySpeed;
  address: Address;
}

export interface AIStyleInput {
  garment: GarmentType;
  occasion: string;
  notes?: string;
}

export interface AIStyleRecommendation {
  title: string;
  description: string;
  garment: GarmentType;
  fitProfile: string;
  fabric: {
    name: string;
    whyRecommended: string;
    weight: string;
  };
  details: {
    collar: string;
    cuffs: string;
    pockets: string;
  };
  colorPalette: Array<{
    name: string;
    hex: string;
  }>;
  stylingTip: string;
}
