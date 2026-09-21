"use client";

import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
  shortLabel: string;
}

const STEPS: Step[] = [
  { id: 1, label: "Garment", shortLabel: "Style" },
  { id: 2, label: "Customization", shortLabel: "Details" },
  { id: 3, label: "Measurement", shortLabel: "Fit" },
  { id: 4, label: "Fabric", shortLabel: "Fabric" },
  { id: 5, label: "Schedule & Address", shortLabel: "Slot" },
  { id: 6, label: "Review", shortLabel: "Review" },
];

interface BookingProgressProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function BookingProgress({ currentStep, onStepClick }: BookingProgressProps) {
  return (
    <div className="w-full mb-8">
      {/* Desktop Step Bar */}
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-[var(--border-subtle)] -z-0" />
        <div
          className="absolute top-4 left-6 h-0.5 bg-[var(--primary)] -z-0 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <button
              key={step.id}
              onClick={() => isCompleted && onStepClick?.(step.id)}
              disabled={!isCompleted}
              className={`flex flex-col items-center group relative z-10 transition-colors ${
                isCompleted ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : isCurrent
                    ? "bg-surface-primary border-2 border-[var(--primary)] text-[var(--primary)] ring-4 ring-[var(--primary)]/15 shadow-md"
                    : "bg-surface-secondary border border-[var(--border-subtle)] text-[var(--muted-foreground)]"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`text-xs mt-2 font-medium tracking-tight whitespace-nowrap transition-colors ${
                  isCurrent
                    ? "text-[var(--primary)] font-bold"
                    : isCompleted
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)]"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Step Bar */}
      <div className="md:hidden flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold">
            {currentStep}
          </span>
          <div className="text-xs font-bold text-[var(--foreground)]">
            Step {currentStep} of {STEPS.length}:{" "}
            <span className="text-[var(--primary)]">
              {STEPS.find((s) => s.id === currentStep)?.label}
            </span>
          </div>
        </div>
        <div className="text-[11px] text-[var(--muted-foreground)]">
          {Math.round((currentStep / STEPS.length) * 100)}% done
        </div>
      </div>
      <div className="md:hidden mt-2 w-full h-1 bg-surface-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-300"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
