"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { GarmentType } from "@/types";

interface PricingConfig {
  name: string;
  baseStitch: number;
  fabricPrice: number;
  deliveryDays: number;
}

const PRICING_DATA: Record<GarmentType, PricingConfig> = {
  shirt: { name: "Bespoke Shirt", baseStitch: 699, fabricPrice: 800, deliveryDays: 3 },
  trousers: { name: "Tailored Trousers", baseStitch: 899, fabricPrice: 950, deliveryDays: 4 },
  suit: { name: "2-Piece Bespoke Suit", baseStitch: 3499, fabricPrice: 3800, deliveryDays: 7 },
  kurta: { name: "Ethnic Kurta", baseStitch: 799, fabricPrice: 700, deliveryDays: 4 },
  blouse: { name: "Designer Saree Blouse", baseStitch: 649, fabricPrice: 550, deliveryDays: 3 },
  dress: { name: "Custom Dress", baseStitch: 1199, fabricPrice: 1200, deliveryDays: 5 },
};

export default function PricingEstimator() {
  const [selectedGarment, setSelectedGarment] = useState<GarmentType>("shirt");
  const [supplyFabric, setSupplyFabric] = useState<boolean>(false);
  const [isExpress, setIsExpress] = useState<boolean>(false);
  const [monogram, setMonogram] = useState<boolean>(false);

  const cfg = PRICING_DATA[selectedGarment];
  const stitchFee = cfg.baseStitch;
  const fabricFee = supplyFabric ? cfg.fabricPrice : 0;
  const expressFee = isExpress ? 300 : 0;
  const monogramFee = monogram ? 150 : 0;
  const subtotal = stitchFee + fabricFee + expressFee + monogramFee;
  const doorstepVisitFee = 0; // Free in MVP
  const total = subtotal + doorstepVisitFee;
  const estimatedDays = isExpress ? Math.max(2, cfg.deliveryDays - 2) : cfg.deliveryDays;

  return (
    <section id="pricing" className="py-20 bg-surface-secondary/40 border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            Instant Cost Estimator
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)]">
            No hidden charges, no haggling. Exactly what you see is what you pay. Doorstep tailor visit is always complimentary.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-surface-primary border border-[var(--border-subtle)] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Selectors */}
            <div className="md:col-span-7 space-y-6">
              {/* 1. Choose Garment */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block mb-3">
                  1. Select Garment Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(Object.keys(PRICING_DATA) as GarmentType[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGarment(g)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        selectedGarment === g
                          ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm"
                          : "border-[var(--border-subtle)] bg-surface-secondary text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <div>{PRICING_DATA[g].name}</div>
                      <div className="text-[10px] font-normal opacity-80 mt-0.5">
                        From ₹{PRICING_DATA[g].baseStitch}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Fabric Option */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block mb-3">
                  2. Fabric Selection
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSupplyFabric(false)}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                      !supplyFabric
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)]"
                        : "border-[var(--border-subtle)] bg-surface-secondary text-[var(--muted-foreground)]"
                    }`}
                  >
                    <div className="font-semibold text-[var(--foreground)]">I have my own fabric</div>
                    <div className="text-[11px] text-emerald-500 font-medium mt-0.5">₹0 (Free doorstep pickup)</div>
                  </button>

                  <button
                    onClick={() => setSupplyFabric(true)}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                      supplyFabric
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)]"
                        : "border-[var(--border-subtle)] bg-surface-secondary text-[var(--muted-foreground)]"
                    }`}
                  >
                    <div className="font-semibold text-[var(--foreground)]">Source via Threadly</div>
                    <div className="text-[11px] text-[var(--primary)] font-medium mt-0.5">+₹{cfg.fabricPrice} (Curated mills)</div>
                  </button>
                </div>
              </div>

              {/* 3. Add-on services */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block mb-3">
                  3. Premium Add-ons
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] cursor-pointer hover:border-[var(--border-strong)] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isExpress}
                        onChange={(e) => setIsExpress(e.target.checked)}
                        className="rounded accent-[var(--primary)] w-4 h-4"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          Express 48h–72h Turnaround
                        </div>
                        <div className="text-[10px] text-[var(--muted-foreground)]">Priority cutter & stitcher slot</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[var(--foreground)]">+₹300</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] cursor-pointer hover:border-[var(--border-strong)] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={monogram}
                        onChange={(e) => setMonogram(e.target.checked)}
                        className="rounded accent-[var(--primary)] w-4 h-4"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-[var(--foreground)]">Hand Embroidered Monogram Initials</div>
                        <div className="text-[10px] text-[var(--muted-foreground)]">On cuff, chest pocket, or inner waistband</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[var(--foreground)]">+₹150</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Bill Receipt */}
            <div className="md:col-span-5 rounded-2xl bg-surface-secondary border border-[var(--border-subtle)] p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <span className="text-xs font-mono font-semibold text-[var(--muted-foreground)]">ESTIMATED INVOICE</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold">
                  All taxes included
                </span>
              </div>

              {/* Line items */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">{cfg.name} Stitching</span>
                  <span className="font-semibold text-[var(--foreground)]">₹{stitchFee}</span>
                </div>

                {supplyFabric && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Premium Mill Fabric</span>
                    <span className="font-semibold text-[var(--foreground)]">₹{fabricFee}</span>
                  </div>
                )}

                {isExpress && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Express Fast-Track</span>
                    <span className="font-semibold text-[var(--foreground)]">₹{expressFee}</span>
                  </div>
                )}

                {monogram && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Custom Monogram</span>
                    <span className="font-semibold text-[var(--foreground)]">₹{monogramFee}</span>
                  </div>
                )}

                <div className="flex justify-between text-emerald-500">
                  <span>Doorstep Master Tailor Visit</span>
                  <span className="font-semibold line-through opacity-70 text-[var(--muted-foreground)] mr-1">₹199</span>
                  <span className="font-semibold">FREE</span>
                </div>
              </div>

              {/* Total & ETA */}
              <div className="border-t border-[var(--border-subtle)] pt-4 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[var(--foreground)]">Total Price</span>
                  <span className="text-2xl font-black text-[var(--primary)]">₹{total}</span>
                </div>
                <div className="text-[11px] text-[var(--muted-foreground)] flex items-center justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold text-[var(--foreground)]">{estimatedDays} Business Days</span>
                </div>
              </div>

              {/* CTA button */}
              <Link
                href={`/book?garment=${selectedGarment}&supply=${supplyFabric}&express=${isExpress}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold shadow-md shadow-[var(--primary)]/20 transition-all"
              >
                <span>Book This Custom Fit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Guarantee badge */}
              <div className="flex items-center gap-2 text-[11px] text-[var(--muted-foreground)] justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero Risk: Free Alteration Guarantee</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
