"use client";

import { FabricChoice, FabricSourceType } from "@/types";
import { Layers, CheckCircle2, ArrowLeft, ArrowRight, Info } from "lucide-react";

interface Step4FabricProps {
  fabric: FabricChoice;
  onChangeFabric: (fabric: FabricChoice) => void;
  onNext: () => void;
  onBack: () => void;
}

const CURATED_MILL_FABRICS = [
  { id: "giza_cotton", name: "100% Egyptian Giza Cotton", mill: "Arvind Luxury", price: 850, tag: "Breathable & Crisp" },
  { id: "irish_linen", name: "Pure Irish Melange Linen", mill: "Baird McNutt", price: 1100, tag: "Summer Essential" },
  { id: "wool_blend", name: "Super 120s Fine Wool Blend", mill: "Raymond Reserve", price: 1800, tag: "All-Season Drape" },
  { id: "raw_silk", name: "Chanderi Mulberry Raw Silk", mill: "Heritage Loom", price: 1400, tag: "Festive & Wedding" },
  { id: "stretch_chino", name: "Comfort Cotton Twill (3% Lycra)", mill: "Vardhman Mills", price: 750, tag: "Flexible Everyday" },
];

export default function Step4Fabric({
  fabric,
  onChangeFabric,
  onNext,
  onBack,
}: Step4FabricProps) {
  const isProvidingOwn = fabric.type === "provide_own";

  const handleToggleSource = (type: FabricSourceType) => {
    onChangeFabric({
      ...fabric,
      type,
      material: type === "provide_own" ? (fabric.material || "Pure Cotton Linen") : (fabric.material || CURATED_MILL_FABRICS[0].name),
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-[var(--foreground)]">
          Fabric Handover & Sourcing
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
          Tell us how you'd like to supply the fabric for your garment.
        </p>
      </div>

      {/* 2 Primary Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 1: Provide own fabric */}
        <div
          onClick={() => handleToggleSource("provide_own")}
          className={`cursor-pointer rounded-2xl p-6 border transition-all relative flex flex-col justify-between ${
            isProvidingOwn
              ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-2 ring-[var(--primary)]/20 shadow-md"
              : "border-[var(--border-subtle)] bg-surface-primary hover:border-[var(--border-strong)]"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                Option A
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold">
                ₹0 Pickup Fee
              </span>
            </div>
            <h3 className="text-base font-bold text-[var(--foreground)] mb-2">
              I Have My Own Fabric
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Hand your cloth to our tailor or courier during the scheduled doorstep visit. We inspect, steam, and safeguard your fabric.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs text-emerald-500 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Free Doorstep Pickup Included</span>
          </div>
        </div>

        {/* Option 2: Source via Threadly */}
        <div
          onClick={() => handleToggleSource("source_threadly")}
          className={`cursor-pointer rounded-2xl p-6 border transition-all relative flex flex-col justify-between ${
            !isProvidingOwn
              ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-2 ring-[var(--primary)]/20 shadow-md"
              : "border-[var(--border-subtle)] bg-surface-primary hover:border-[var(--border-strong)]"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                Option B
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-semibold">
                Curated Mills
              </span>
            </div>
            <h3 className="text-base font-bold text-[var(--foreground)] mb-2">
              Source Fabric via THREADLY
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Select premium cloth sourced directly from certified heritage textile mills. The tailor brings physical swatches to verify texture.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--primary)] font-medium">
            <Layers className="w-4 h-4" />
            <span>Physical Swatch Book Available</span>
          </div>
        </div>
      </div>

      {/* Dynamic Detail Input depending on selection */}
      {isProvidingOwn ? (
        <div className="p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Your Fabric Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[var(--muted-foreground)] block mb-1.5 font-medium">
                Fabric Material & Color
              </label>
              <input
                type="text"
                placeholder="e.g. Navy Blue 100% Linen"
                value={fabric.material || ""}
                onChange={(e) => onChangeFabric({ ...fabric, material: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--muted-foreground)] block mb-1.5 font-medium">
                Approximate Length / Yardage (meters)
              </label>
              <input
                type="text"
                placeholder="e.g. 2.0 meters"
                value={fabric.notes || ""}
                onChange={(e) => onChangeFabric({ ...fabric, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-start gap-2 text-[11px] text-[var(--muted-foreground)] pt-1">
            <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <span>Our tailor will verify yardage during the doorstep visit and record an RFID tag ID for live tracking.</span>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Select Mill Fabric Quality
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CURATED_MILL_FABRICS.map((mill) => {
              const isSel = fabric.material === mill.name;
              return (
                <button
                  type="button"
                  key={mill.id}
                  onClick={() => onChangeFabric({ ...fabric, material: mill.name, notes: `${mill.mill} - ₹${mill.price}` })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSel
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)]"
                      : "border-[var(--border-subtle)] bg-surface-secondary text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-xs text-[var(--foreground)]">{mill.name}</div>
                      <div className="text-[11px] text-[var(--primary)] font-medium mt-0.5">{mill.mill}</div>
                    </div>
                    <span className="text-xs font-extrabold text-[var(--foreground)]">+₹{mill.price}</span>
                  </div>
                  <div className="mt-2 text-[10px] text-[var(--muted-foreground)]">{mill.tag}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
        >
          <span>Next: Schedule Visit & Address</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
