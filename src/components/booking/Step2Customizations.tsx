"use client";

import { GarmentType, CustomizationOptions } from "@/types";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface Step2CustomizationsProps {
  garment: GarmentType;
  customizations: CustomizationOptions;
  onChange: (c: CustomizationOptions) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Customizations({
  garment,
  customizations,
  onChange,
  onNext,
  onBack,
}: Step2CustomizationsProps) {
  const update = (field: keyof CustomizationOptions, val: string) => {
    onChange({ ...customizations, [field]: val });
  };

  const getFitOptions = () => [
    { id: "Slim Fit", desc: "Tapered contour, closer to chest and waist" },
    { id: "Regular Fit", desc: "Classic drape with comfortable ease of movement" },
    { id: "Relaxed Fit", desc: "Airy, loose silhouette, ideal for linen and kurtas" },
  ];

  const getCollarOptions = () => {
    switch (garment) {
      case "shirt":
        return ["Cutaway Collar", "Classic Spread", "Button-Down Casual", "Mandarin / Band Collar", "Club Rounded"];
      case "suit":
        return ["Notch Lapel (Classic)", "Peak Lapel (Bold)", "Shawl Collar (Tuxedo)", "Bandhgala High Neck"];
      case "kurta":
        return ["Mandarin Band", "Shirt Collar Placket", "Angrakha Overlap", "Nehru Stand"];
      case "blouse":
        return ["Princess Deep-Neck", "Boat Neck", "Sweetheart Neck", "Halter Neck", "High Collar Backless"];
      default:
        return ["Standard Collar", "Minimalist Clean", "Mandarin Collar"];
    }
  };

  const getCuffOptions = () => {
    switch (garment) {
      case "shirt":
        return ["Single Button Rounded", "French Double Cuff (For Cufflinks)", "Two-Button Angle", "Short Sleeve"];
      case "suit":
        return ["4 Working Horn Buttons", "3 Kissing Buttons", "Surgeon's Cuffs"];
      case "blouse":
        return ["Elbow Length with Piping", "Cap Sleeves", "Sleeveless Padded", "Full Sheer Sleeves"];
      case "trousers":
        return ["Clean Plain Hem", "1.5\" Turned-Up Cuff", "Jogger Elastic Cinch"];
      default:
        return ["Classic Finish", "Cuffed Hem", "Clean Minimalist"];
    }
  };

  const getPocketOptions = () => {
    switch (garment) {
      case "shirt":
        return ["No Pocket (Clean Modern)", "Single Rounded Left Pocket", "Dual Flap Utility Pockets"];
      case "trousers":
        return ["Slanted Side Pockets + 2 Welt Back", "Vertical Seam Pockets", "Watch Pocket Addition"];
      case "suit":
        return ["Flap Pockets + Ticket Pocket", "Jetted Pockets (Formal)", "Patch Pockets (Casual)"];
      case "kurta":
        return ["Dual In-Seam Pockets", "Single Chest Welt", "No Pockets"];
      default:
        return ["Side Pockets", "No Pockets", "Concealed Zip Pocket"];
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-[var(--foreground)]">
          Bespoke Customizations
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
          Specify your tailoring nuances. These will guide the master pattern-cutter.
        </p>
      </div>

      {/* 1. Fit Profile */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block">
          1. Silhouette & Fit
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {getFitOptions().map((opt) => {
            const isSel = (customizations.fit || "Slim Fit") === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => update("fit", opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSel
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)] ring-2 ring-[var(--primary)]/20"
                    : "border-[var(--border-subtle)] bg-surface-primary hover:border-[var(--border-strong)] text-[var(--muted-foreground)]"
                }`}
              >
                <div className="font-bold text-xs text-[var(--foreground)]">{opt.id}</div>
                <div className="text-[11px] text-[var(--muted-foreground)] mt-1 leading-snug">{opt.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Collar / Neckline */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block">
          2. Collar / Neckline Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {getCollarOptions().map((c) => {
            const isSel = (customizations.collar || getCollarOptions()[0]) === c;
            return (
              <button
                type="button"
                key={c}
                onClick={() => update("collar", c)}
                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                  isSel
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-bold shadow-sm"
                    : "border-[var(--border-subtle)] bg-surface-primary text-[var(--foreground)] hover:border-[var(--border-strong)]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Cuffs / Hem */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block">
          3. Cuffs & Sleeves Finish
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {getCuffOptions().map((c) => {
            const isSel = (customizations.cuff || getCuffOptions()[0]) === c;
            return (
              <button
                type="button"
                key={c}
                onClick={() => update("cuff", c)}
                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                  isSel
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-bold shadow-sm"
                    : "border-[var(--border-subtle)] bg-surface-primary text-[var(--foreground)] hover:border-[var(--border-strong)]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Pockets */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block">
          4. Pocket Configuration
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {getPocketOptions().map((p) => {
            const isSel = (customizations.pockets || getPocketOptions()[0]) === p;
            return (
              <button
                type="button"
                key={p}
                onClick={() => update("pockets", p)}
                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                  isSel
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-bold shadow-sm"
                    : "border-[var(--border-subtle)] bg-surface-primary text-[var(--foreground)] hover:border-[var(--border-strong)]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Monogram Initials & Special Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block mb-1.5">
            Monogram Initials (Optional)
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="e.g. SMA or R.K."
            value={customizations.monogram || ""}
            onChange={(e) => update("monogram", e.target.value.toUpperCase())}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-primary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
          />
          <span className="text-[10px] text-[var(--muted-foreground)] mt-1 block">
            Hand-stitched on left cuff or inside breast facing.
          </span>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block mb-1.5">
            Special Tailor Notes
          </label>
          <input
            type="text"
            placeholder="e.g. Slightly longer sleeves, broad shoulders"
            value={customizations.specialNotes || ""}
            onChange={(e) => update("specialNotes", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-primary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
          />
          <span className="text-[10px] text-[var(--muted-foreground)] mt-1 block">
            Passed directly to the master cutter before drafting pattern.
          </span>
        </div>
      </div>

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
          <span>Next: Select Measurement Method</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
