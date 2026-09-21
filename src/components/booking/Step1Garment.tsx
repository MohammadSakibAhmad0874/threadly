"use client";

import { GarmentType } from "@/types";
import { CATALOG_ITEMS } from "@/components/landing/GarmentCatalog";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";

interface Step1GarmentProps {
  selectedGarment: GarmentType;
  quantity: number;
  onSelectGarment: (garment: GarmentType) => void;
  onChangeQuantity: (qty: number) => void;
  onNext: () => void;
}

export default function Step1Garment({
  selectedGarment,
  quantity,
  onSelectGarment,
  onChangeQuantity,
  onNext,
}: Step1GarmentProps) {
  const currentItem = CATALOG_ITEMS.find((item) => item.id === selectedGarment) || CATALOG_ITEMS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-[var(--foreground)]">
          Select Your Garment
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
          Choose what you would like our master tailors to craft for you today.
        </p>
      </div>

      {/* Grid of Garments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATALOG_ITEMS.map((item) => {
          const isSelected = selectedGarment === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onSelectGarment(item.id as GarmentType)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative flex flex-col justify-between ${
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-2 ring-[var(--primary)]/20 shadow-md"
                  : "border-[var(--border-subtle)] bg-surface-primary hover:border-[var(--border-strong)] hover:bg-surface-secondary/50"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-[var(--primary)]">
                  <CheckCircle2 className="w-5 h-5 fill-[var(--primary)] text-white" />
                </div>
              )}

              <div>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider">
                  {item.category}
                </div>
                <h3 className="text-base font-bold text-[var(--foreground)] mt-0.5">
                  {item.name}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Stitch fee</span>
                  <span className="font-extrabold text-[var(--foreground)]">₹{item.basePrice}</span>
                </div>
                <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{item.deliveryDays}d turnaround</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quantity Selector */}
      <div className="p-4 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-[var(--foreground)]">Quantity to Stitch</h4>
          <p className="text-[11px] text-[var(--muted-foreground)]">
            Stitching multiple garments? You can hand over fabric for all at once.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-lg bg-surface-primary border border-[var(--border-subtle)] font-bold text-sm hover:bg-[var(--surface-hover)]"
          >
            -
          </button>
          <span className="font-bold text-sm w-4 text-center">{quantity}</span>
          <button
            onClick={() => onChangeQuantity(Math.min(10, quantity + 1))}
            className="w-8 h-8 rounded-lg bg-surface-primary border border-[var(--border-subtle)] font-bold text-sm hover:bg-[var(--surface-hover)]"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
        >
          <span>Next: Customize Styling ({currentItem.name})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
